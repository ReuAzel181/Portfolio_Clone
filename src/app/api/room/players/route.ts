import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const { code } = await request.json();
    if (!code) {
      return NextResponse.json({ error: 'Room code is required' }, { status: 400 });
    }

    // Get room
    const room = await prisma.$queryRaw`
      SELECT id, code, "gameStarted"
      FROM "Room"
      WHERE code = ${code}
    `;

    if (!room || !Array.isArray(room) || room.length === 0) {
      return NextResponse.json({ error: 'Room not found' }, { status: 404 });
    }

    // Get players with ready status using raw SQL
    const players = await prisma.$queryRaw`
      SELECT id, name, roomid, joinedat, ready 
      FROM "Player" 
      WHERE roomid = ${room[0].id} 
      ORDER BY joinedat ASC
    `;

    return NextResponse.json({
      room: room[0],
      players
    });
  } catch (error) {
    console.error('Error getting room players:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to get room players' },
      { status: 500 }
    );
  }
} 