import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const { quizTitle, playerName } = await req.json();
    if (!quizTitle) {
      return NextResponse.json({ error: 'Quiz title is required' }, { status: 400 });
    }
    if (!playerName) {
      return NextResponse.json({ error: 'Player name is required' }, { status: 400 });
    }

    // First try to find an existing quiz
    let quiz = await prisma.quiz.findFirst({
      where: { title: quizTitle },
      include: { questions: true }
    });

    // If no quiz exists or it has no questions, create a new one with questions
    if (!quiz || quiz.questions.length === 0) {
      // Create quiz with sample questions
      quiz = await prisma.quiz.create({
        data: {
          title: quizTitle,
          questions: {
            create: [
              {
                text: "What is the capital of France?",
                answers: {
                  create: [
                    { value: "Paris", isCorrect: true },
                    { value: "London", isCorrect: false },
                    { value: "Berlin", isCorrect: false },
                    { value: "Madrid", isCorrect: false }
                  ]
                }
              },
              {
                text: "Which planet is known as the Red Planet?",
                answers: {
                  create: [
                    { value: "Mars", isCorrect: true },
                    { value: "Venus", isCorrect: false },
                    { value: "Jupiter", isCorrect: false },
                    { value: "Saturn", isCorrect: false }
                  ]
                }
              }
            ]
          }
        },
        include: { questions: true }
      });
    }

    // Generate unique room code
    let code;
    let exists = true;
    while (exists) {
      code = Math.random().toString(36).substring(2, 8).toUpperCase();
      exists = !!(await prisma.room.findUnique({ where: { code } }));
    }

    // Create room
    const room = await prisma.room.create({
      data: {
        code: code as string,
        quizid: quiz.id,
      },
    });

    // Create player
    const player = await prisma.player.create({
      data: {
        name: playerName,
        roomid: room.id,
      },
    });

    return NextResponse.json({ 
      roomid: room.id, 
      code: room.code,
      playerId: player.id,
      playerName: player.name,
      ready: player.ready
    });
  } catch (error) {
    console.error('Error creating room:', error);
    return NextResponse.json({ error: 'Failed to create room' }, { status: 500 });
  }
} 