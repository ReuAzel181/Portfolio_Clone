import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

interface RawQuizRow {
  question_id: string;
  question_text: string;
  answer_id: string | null;
  answer_value: string | null;
  is_correct: boolean | null;
}

interface Answer {
  id: string;
  value: string;
  isCorrect: boolean;
}

interface Question {
  id: string;
  text: string;
  answers: Answer[];
}

export async function GET(
  req: Request,
  { params }: { params: { code: string } }
) {
  try {
    const { code } = params;
    
    // Get room to verify it exists and get quiz ID
    const room = await prisma.$queryRaw`
      SELECT id, quizid
      FROM "Room"
      WHERE code = ${code}
    `;

    if (!room || !Array.isArray(room) || room.length === 0) {
      return NextResponse.json({ error: 'Room not found' }, { status: 404 });
    }

    if (!room[0].quizid) {
      return NextResponse.json({ error: 'No quiz found for this room' }, { status: 404 });
    }

    // Get quiz questions with answers
    const quiz = await prisma.$queryRaw<RawQuizRow[]>`
      SELECT q.id as question_id, q.text as question_text,
             a.id as answer_id, a.value as answer_value, a."isCorrect" as is_correct
      FROM "Question" q
      LEFT JOIN "Answer" a ON a."questionId" = q.id
      WHERE q.quizid = ${room[0].quizid}
      ORDER BY q.id, a.id
    `;

    if (!quiz || quiz.length === 0) {
      return NextResponse.json({ error: 'Quiz not found' }, { status: 404 });
    }

    // Transform the flat results into nested structure
    const questions = quiz.reduce<Question[]>((acc, curr) => {
      const existingQuestion = acc.find(q => q.id === curr.question_id);
      
      if (!existingQuestion) {
        acc.push({
          id: curr.question_id,
          text: curr.question_text,
          answers: curr.answer_id && curr.answer_value && curr.is_correct !== null ? [{
            id: curr.answer_id,
            value: curr.answer_value,
            isCorrect: curr.is_correct
          }] : []
        });
      } else if (curr.answer_id && curr.answer_value && curr.is_correct !== null) {
        existingQuestion.answers.push({
          id: curr.answer_id,
          value: curr.answer_value,
          isCorrect: curr.is_correct
        });
      }
      
      return acc;
    }, []);

    return NextResponse.json({ questions });
  } catch (error) {
    console.error('Error fetching quiz:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch quiz' },
      { status: 500 }
    );
  }
} 