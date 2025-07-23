"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
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

export default function CreateRoomPage() {
  const [quizTitle, setQuizTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const stars = useStars(60);
  // Simple theme detection (light/dark)
  const isDark = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const palette = isDark ? colors.dark : colors.light;
  const highlight = isDark ? colors.highlights.dark : colors.highlights.light;

  useEffect(() => {
    // Check if user has set their name
    const userName = localStorage.getItem('userName');
    if (!userName) {
      router.push('/profile');
    }
  }, [router]);

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
      <div className="z-10 rounded-2xl shadow-xl flex flex-col items-center p-10 max-w-md w-full" style={{ background: palette.surface, border: `2px solid ${palette.secondary}` }}>
        <h2 className="text-2xl font-bold mb-4 tracking-wider drop-shadow" style={{ color: palette.textPrimary }}>Create a New Room</h2>
        <form onSubmit={async (e) => {
          e.preventDefault();
          setLoading(true);
          setError(null);

          try {
            const playerName = localStorage.getItem('userName');
            if (!playerName) {
              router.push('/profile');
              return;
            }

            const response = await fetch('/api/room/create', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ quizTitle, playerName }),
            });

            const data = await response.json();
            if (!response.ok) {
              throw new Error(data.error || 'Failed to create room');
            }

            // Store player ID
            localStorage.setItem('playerId', data.playerId);

            router.push(`/lobby/${data.code}`);
          } catch (err: any) {
            setError(err.message);
          } finally {
            setLoading(false);
          }
        }} className="flex flex-col gap-4 w-full">
          <input
            type="text"
            placeholder="Quiz Title"
            value={quizTitle}
            onChange={e => setQuizTitle(e.target.value)}
            className="rounded-xl px-4 py-2 text-lg focus:outline-none focus:ring-2 bg-transparent placeholder:text-gray-400"
            style={{ border: `2px solid ${palette.border}`, color: palette.textPrimary, background: palette.background }}
            required
          />
          <button
            type="submit"
            className={highlight.button + ' py-3 rounded-full font-bold text-lg shadow-lg hover:scale-105 transition-transform'}
            disabled={loading}
            style={{ background: palette.primary, color: palette.textPrimary }}
          >
            {loading ? 'Creating...' : 'Create Room'}
          </button>
          {error && <div className="text-sm" style={{ color: palette.secondary }}>{error}</div>}
        </form>
      </div>
    </main>
  );
} 