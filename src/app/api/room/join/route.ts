import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const { code, playerName } = await req.json();
    if (!code) {
      return NextResponse.json({ error: 'Room code is required' }, { status: 400 });
    }
    if (!playerName) {
      return NextResponse.json({ error: 'Player name is required' }, { status: 400 });
    }

    // Find room
    const room = await prisma.room.findUnique({
      where: { code },
      include: { players: true }
    });

    if (!room) {
      return NextResponse.json({ error: 'Room not found' }, { status: 404 });
    }

    // Create player
    const player = await prisma.player.create({
      data: {
        name: playerName,
        roomid: room.id,
      },
    });

    return NextResponse.json({ 
      roomId: room.id,
      playerId: player.id,
      playerName: player.name,
      ready: player.ready
    });
  } catch (error) {
    console.error('Error joining room:', error);
    return NextResponse.json({ error: 'Failed to join room' }, { status: 500 });
  }
} 