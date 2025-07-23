import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const { code } = await req.json();
    if (!code) {
      return NextResponse.json({ error: 'Room code is required' }, { status: 400 });
    }

    // Get room
    const room = await prisma.room.findUnique({
      where: { code },
      select: {
        id: true,
        code: true,
        gameStarted: true
      }
    });

    if (!room) {
      return NextResponse.json({ error: 'Room not found' }, { status: 404 });
    }

    // Get players with ready status using raw SQL
    const players = await prisma.$queryRaw`
      SELECT id, name, roomid, joinedat, ready 
      FROM "Player" 
      WHERE roomid = ${room.id} 
      ORDER BY joinedat ASC
    `;

    return NextResponse.json({
      room: {
        id: room.id,
        code: room.code,
        gameStarted: room.gameStarted
      },
      players
    });
  } catch (error) {
    console.error('Error getting room players:', error);
    return NextResponse.json({ error: 'Failed to get room players' }, { status: 500 });
  }
} 