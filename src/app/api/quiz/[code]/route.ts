import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: NextRequest,
  { params }: { params: { code: string } }
) {
  try {
    const { code } = params;
    
    // Get room to verify it exists and get quiz ID
    const room = await prisma.room.findUnique({
      where: { code },
      select: {
        quizid: true
      }
    });

    if (!room) {
      return NextResponse.json({ error: 'Room not found' }, { status: 404 });
    }

    if (!room.quizid) {
      return NextResponse.json({ error: 'No quiz found for this room' }, { status: 404 });
    }

    // Get quiz questions with answers
    const quiz = await prisma.quiz.findUnique({
      where: { id: room.quizid },
      include: {
        questions: {
          include: {
            answers: true
          }
        }
      }
    });

    if (!quiz) {
      return NextResponse.json({ error: 'Quiz not found' }, { status: 404 });
    }

    return NextResponse.json({ questions: quiz.questions });
  } catch (error) {
    console.error('Error fetching quiz:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch quiz' },
      { status: 500 }
    );
  }
} 