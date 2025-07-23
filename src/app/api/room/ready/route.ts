import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const { playerId, ready } = await req.json();
    console.log('Ready API called with:', { playerId, ready });
    
    if (!playerId) {
      return NextResponse.json({ error: 'Player ID is required' }, { status: 400 });
    }

    // Get current player to verify it exists
    const existingPlayer = await prisma.$queryRaw`
      SELECT id, name, roomid
      FROM "Player"
      WHERE id = ${playerId}
    `;

    if (!existingPlayer || !Array.isArray(existingPlayer) || existingPlayer.length === 0) {
      console.error('Player not found:', playerId);
      return NextResponse.json({ error: 'Player not found' }, { status: 404 });
    }

    console.log('Found player:', existingPlayer[0]);

    // Update player ready status using raw SQL
    await prisma.$executeRaw`
      UPDATE "Player" 
      SET ready = ${ready} 
      WHERE id = ${playerId}
    `;

    console.log('Updated ready status for player:', playerId);

    // Fetch updated player to confirm changes
    const updatedPlayer = await prisma.$queryRaw`
      SELECT id, name, roomid, ready, joinedat
      FROM "Player"
      WHERE id = ${playerId}
    `;

    console.log('Updated player data:', updatedPlayer);

    return NextResponse.json({ 
      success: true,
      player: Array.isArray(updatedPlayer) ? updatedPlayer[0] : updatedPlayer 
    });
  } catch (error) {
    console.error('Error updating player ready status:', error);
    return NextResponse.json({ 
      error: error instanceof Error ? error.message : 'Failed to update ready status' 
    }, { status: 500 });
  }
} 