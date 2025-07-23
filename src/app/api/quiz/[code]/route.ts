import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';


export async function GET(
  request: NextRequest,
  { params }: { params: { code: string } }
) {
  try {
    const code = params.code;
    if (!code) {
      return NextResponse.json({ error: 'Room code is required' }, { status: 400 });
    }

    // Fetch room with quiz and questions
    const room = await prisma.room.findUnique({
      where: { code: code.toUpperCase() },
      include: {
        quiz: {
          include: {
            questions: {
              include: {
                answers: true
              }
            }
          }
        }
      }
    });

    if (!room) {
      return NextResponse.json({ error: 'Room not found' }, { status: 404 });
    }

    if (!room.quiz) {
      return NextResponse.json({ error: 'Quiz not found for this room' }, { status: 404 });
    }

    return NextResponse.json({
      room,
      quiz: room.quiz,
      questions: room.quiz.questions,
    });
  } catch (error) {
    console.error('Error fetching quiz:', error);
    return NextResponse.json({ error: 'Failed to fetch quiz' }, { status: 500 });
  }
} 