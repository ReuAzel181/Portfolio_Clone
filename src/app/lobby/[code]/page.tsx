"use client";
import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { usePlayers } from '@/utils/usePlayers';
import { useEffect, useState } from 'react';
import { colors } from '@/utils/colors';

function useStars(count: number) {
  const [stars, setStars] = useState<any[]>([]);
  useEffect(() => {
    const arr = Array.from({ length: count }, () => ({
      cx: Math.random() * 100 + '%',
      cy: Math.random() * 100 + '%',
      r: Math.random() * 1.2 + 0.3,
      opacity: Math.random() * 0.7 + 0.3,
    }));
    setStars(arr);
  }, [count]);
  return stars;
}

export default function LobbyPage() {
  const { code } = useParams();
  const router = useRouter();
  const { players, room, loading, refetch } = usePlayers(code as string);
  const stars = useStars(60);
  const [isStarting, setIsStarting] = useState(false);
  const [currentPlayerId, setCurrentPlayerId] = useState<string | null>(null);
  const [isTogglingReady, setIsTogglingReady] = useState(false);
  const [readyError, setReadyError] = useState<string | null>(null);
  
  // Get current player from localStorage on mount
  useEffect(() => {
    const storedPlayerId = localStorage.getItem('playerId');
    console.log('Stored player ID:', storedPlayerId);
    if (storedPlayerId) {
      setCurrentPlayerId(storedPlayerId);
    }
  }, []);

  // Check if all players are ready
  const allPlayersReady = players.length > 0 && players.every(p => p.ready);
  const currentPlayer = players.find(p => p.id === currentPlayerId);

  useEffect(() => {
    console.log('Current player state:', { currentPlayerId, currentPlayer, players });
  }, [currentPlayerId, currentPlayer, players]);
  
  // Simple theme detection (light/dark)
  const isDark = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const palette = isDark ? colors.dark : colors.light;
  const highlight = isDark ? colors.highlights.dark : colors.highlights.light;

  // Handle ready toggle
  const handleReadyToggle = async () => {
    if (!currentPlayerId || isTogglingReady) return;
    
    try {
      setIsTogglingReady(true);
      setReadyError(null);
      console.log('Toggling ready state for player:', currentPlayerId);
      
      const response = await fetch('/api/room/ready', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          playerId: currentPlayerId,
          ready: !currentPlayer?.ready
        }),
      });

      const data = await response.json();
      console.log('Ready toggle response:', data);

      if (!response.ok) {
        throw new Error(data.error || 'Failed to update ready status');
      }

      // Manually refetch to ensure state is up to date
      await refetch();
    } catch (error: any) {
      console.error('Error toggling ready status:', error);
      setReadyError(error.message || 'Failed to update ready status');
    } finally {
      setIsTogglingReady(false);
    }
  };

  // Handle game start
  const handleStartGame = async () => {
    if (!allPlayersReady) return;
    
    try {
      setIsStarting(true);
      const response = await fetch('/api/room/start', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code }),
      });

      if (!response.ok) {
        throw new Error('Failed to start game');
      }
    } catch (error) {
      console.error('Error starting game:', error);
      setIsStarting(false);
    }
  };

  // Redirect to quiz when game starts
  useEffect(() => {
    if (room?.gameStarted) {
      router.push(`/quiz/${code}`);
    }
  }, [room?.gameStarted, code, router]);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden" style={{ background: palette.background }}>
      {/* Starry background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <svg width="100%" height="100%" className="absolute inset-0">
          <defs>
            <radialGradient id="star" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#fff" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#fff" stopOpacity="0" />
            </radialGradient>
          </defs>
          {stars.map((star, i) => (
            <circle
              key={i}
              cx={star.cx}
              cy={star.cy}
              r={star.r}
              fill="url(#star)"
              opacity={star.opacity}
            />
          ))}
        </svg>
      </div>
      <div className="z-10 rounded-2xl shadow-xl flex flex-col items-center p-10 max-w-md w-full relative" style={{ background: palette.surface, border: `2px solid ${palette.primary}` }}>
        {/* Back button placeholder */}
        <button className="absolute left-4 top-4 text-xl hover:underline" style={{ color: palette.textPrimary }}>←</button>
        <h2 className="text-2xl font-bold mb-2 tracking-wider drop-shadow" style={{ color: palette.textPrimary }}>Lobby</h2>
        <div className="mb-4 text-lg" style={{ color: palette.textSecondary }}>Room Code:</div>
        <div className="text-2xl font-mono font-bold px-6 py-2 rounded-xl mb-6 tracking-widest select-all" style={{ background: palette.background, color: palette.primary, border: `2px solid ${palette.border}` }}>
          {code}
        </div>
        <div className="w-full mb-6">
          <h3 className="text-lg font-semibold mb-2" style={{ color: palette.primary }}>Players</h3>
          {loading ? (
            <div className="flex justify-center items-center py-8">
              <div className="w-8 h-8 border-4 rounded-full animate-spin" style={{ borderColor: palette.primary, borderTopColor: 'transparent' }}></div>
            </div>
          ) : (
            <ul className="flex flex-col gap-2">
              {players.map(player => (
                <li key={player.id} className="rounded-xl px-4 py-2 font-bold shadow-sm flex items-center justify-between" style={{ background: palette.surface, color: palette.textSecondary }}>
                  <div className="flex items-center gap-2">
                    <span className="inline-block w-2 h-2 rounded-full" style={{ background: player.ready ? '#22c55e' : colors.light.accent }}></span>
                    {player.name}
                    {player.id === currentPlayerId && ' (You)'}
                  </div>
                  {player.ready && (
                    <span className="text-sm px-2 py-1 rounded" style={{ background: '#22c55e33', color: '#22c55e' }}>
                      Ready
                    </span>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
        {currentPlayerId && (
          <>
            <button
              className={`${highlight.button} px-8 py-3 rounded-full font-bold text-lg shadow-lg hover:scale-105 transition-transform mb-2 relative`}
              style={{ 
                background: currentPlayer?.ready ? '#22c55e' : palette.primary,
                color: palette.textPrimary,
                opacity: isTogglingReady ? 0.7 : 1
              }}
              onClick={handleReadyToggle}
              disabled={isTogglingReady || room?.gameStarted}
            >
              {isTogglingReady ? (
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 border-3 border-t-transparent border-white rounded-full animate-spin"></div>
                  <span>Updating...</span>
                </div>
              ) : currentPlayer?.ready ? (
                'Ready!'
              ) : (
                'Click when ready'
              )}
            </button>
            {readyError && (
              <div className="text-sm text-red-500 mb-4">{readyError}</div>
            )}
          </>
        )}
        {allPlayersReady && (
          <button
            className={`${highlight.button} px-8 py-3 rounded-full font-bold text-lg shadow-lg hover:scale-105 transition-transform mb-2 relative`}
            style={{ background: palette.primary, color: palette.textPrimary }}
            onClick={handleStartGame}
            disabled={isStarting || room?.gameStarted || !allPlayersReady}
          >
            {isStarting ? (
              <>
                <span className="opacity-0">Start Game</span>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-6 h-6 border-3 border-t-transparent border-white rounded-full animate-spin"></div>
                </div>
              </>
            ) : room?.gameStarted ? (
              'Game Started...'
            ) : (
              'Start Game'
            )}
          </button>
        )}
        <div className="text-sm mt-2" style={{ color: palette.textSecondary }}>
          {allPlayersReady ? 'Everyone is ready!' : 'Waiting for all players to be ready...'}
        </div>
      </div>
    </main>
  );
} 