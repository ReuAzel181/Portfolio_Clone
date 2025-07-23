import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const { code } = await req.json();
    if (!code) {
      return NextResponse.json({ error: 'Room code is required' }, { status: 400 });
    }

    // Get room to verify it exists
    const room = await prisma.room.findUnique({
      where: { code }
    });

    if (!room) {
      return NextResponse.json({ error: 'Room not found' }, { status: 404 });
    }

    // Update room game started status using raw SQL
    await prisma.$executeRaw`UPDATE "Room" SET "gameStarted" = true WHERE id = ${room.id}`;

    // Get updated room
    const updatedRoom = await prisma.$queryRaw`
      SELECT id, code, "gameStarted"
      FROM "Room"
      WHERE id = ${room.id}
    `;

    return NextResponse.json({ room: updatedRoom[0] });
  } catch (error) {
    console.error('Error starting game:', error);
    return NextResponse.json({ error: 'Failed to start game' }, { status: 500 });
  }
} 