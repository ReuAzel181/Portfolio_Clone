import { useEffect, useState, useCallback } from 'react';
import { supabase } from './supabaseClient';
import { SupabaseChannel } from './types';

export interface Player {
  id: string;
  name: string;
  roomid: string;
  joinedat: string;
  ready: boolean;
}

export interface Room {
  id: string;
  code: string;
  gameStarted: boolean;
}

interface Channels {
  playerChannel?: SupabaseChannel;
  roomChannel?: SupabaseChannel;
}

export function usePlayers(roomCode: string) {
  const [players, setPlayers] = useState<Player[]>([]);
  const [room, setRoom] = useState<Room | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Function to fetch players and room data
  const fetchData = useCallback(async () => {
    if (!roomCode) return null;

    try {
      setError(null);
      const response = await fetch('/api/room/players', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code: roomCode }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch players');
      }

      setPlayers(data.players || []);
      setRoom(data.room || null);
      return data.room;
    } catch (error) {
      console.error('Error fetching data:', error);
      setError(error instanceof Error ? error.message : 'Failed to fetch players');
      return null;
    } finally {
      setLoading(false);
    }
  }, [roomCode]);

  // Function to setup real-time subscriptions
  const setupSubscriptions = useCallback(async (roomId: string): Promise<Channels> => {
    const playerChannel = supabase.channel(`players-${roomId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'Player',
          filter: `roomid=eq.${roomId}`
        },
        () => {
          // Simple debounce for multiple rapid updates
          fetchData();
        }
      )
      .subscribe((status) => {
        if (status !== 'SUBSCRIBED') {
          console.error('Failed to subscribe to player changes:', status);
        }
      });

    const roomChannel = supabase.channel(`room-${roomId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'Room',
          filter: `id=eq.${roomId}`
        },
        () => {
          fetchData();
        }
      )
      .subscribe((status) => {
        if (status !== 'SUBSCRIBED') {
          console.error('Failed to subscribe to room changes:', status);
        }
      });

    return { playerChannel, roomChannel };
  }, [fetchData]);

  useEffect(() => {
    let channels: Channels = {};
    let mounted = true;

    const initialize = async () => {
      const roomData = await fetchData();
      
      if (!mounted) return;

      if (roomData?.id) {
        channels = await setupSubscriptions(roomData.id);
      }
    };

    initialize();

    // Poll for updates as a fallback
    const pollInterval = setInterval(() => {
      if (mounted) {
        fetchData();
      }
    }, 3000);

    return () => {
      mounted = false;
      clearInterval(pollInterval);
      
      if (channels.playerChannel) {
        supabase.removeChannel(channels.playerChannel);
      }
      if (channels.roomChannel) {
        supabase.removeChannel(channels.roomChannel);
      }
    };
  }, [roomCode, fetchData, setupSubscriptions]);

  return { 
    players, 
    room, 
    loading, 
    error,
    refetch: fetchData 
  };
} 