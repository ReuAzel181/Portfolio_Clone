import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const { code } = await request.json();
    if (!code) {
      return NextResponse.json({ error: 'Room code is required' }, { status: 400 });
    }

    // Get room to verify it exists
    const room = await prisma.$queryRaw`
      SELECT id, code
      FROM "Room"
      WHERE code = ${code}
    `;

    if (!room || !Array.isArray(room) || room.length === 0) {
      return NextResponse.json({ error: 'Room not found' }, { status: 404 });
    }

    // Update room game started status using raw SQL
    await prisma.$executeRaw`
      UPDATE "Room" 
      SET "gameStarted" = true 
      WHERE id = ${room[0].id}
    `;

    // Get updated room
    const updatedRoom = await prisma.$queryRaw`
      SELECT id, code, "gameStarted"
      FROM "Room"
      WHERE id = ${room[0].id}
    `;

    return NextResponse.json({ 
      room: Array.isArray(updatedRoom) ? updatedRoom[0] : updatedRoom 
    });
  } catch (error) {
    console.error('Error starting game:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to start game' },
      { status: 500 }
    );
  }
} 