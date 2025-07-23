"use client";
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { colors } from '@/utils/colors';

interface Question {
  id: string;
  text: string;
  quizid: string;
  answers: Answer[];
}

interface Answer {
  id: string;
  value: string;
  isCorrect: boolean;
  questionId: string;
}

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

export default function QuizPage() {
  const { code } = useParams();
  const stars = useStars(60);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [currentScore, setCurrentScore] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch questions and answers for the room/quiz
  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`/api/quiz/${code}`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Failed to fetch quiz');
        }

        setQuestions(data.questions);
        setLoading(false);
      } catch (err: any) {
        console.error('Error fetching quiz:', err);
        setError(err.message);
        setLoading(false);
      }
    }
    if (code) {
      fetchData();
    }
  }, [code]);

  // Get current question
  const currentQuestion = questions[currentQuestionIdx];

  // Simple theme detection (light/dark)
  const isDark = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const palette = isDark ? colors.dark : colors.light;
  const highlight = isDark ? colors.highlights.dark : colors.highlights.light;

  // Handle answer selection
  const handleAnswer = (option: Answer) => {
    if (selected) return; // Prevent multiple answers
    setSelected(option.value);
    if (option.isCorrect) {
      setCurrentScore(s => s + 1);
    }
    // Go to next question after a short delay
    setTimeout(() => {
      setSelected(null);
      if (currentQuestionIdx < questions.length - 1) {
        setCurrentQuestionIdx(idx => idx + 1);
      }
    }, 1200);
  };

  if (loading) return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  if (error) return <div className="flex items-center justify-center min-h-screen text-red-500">{error}</div>;
  if (!currentQuestion) return <div className="flex items-center justify-center min-h-screen">No questions found.</div>;

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
      <div className="z-10 w-full max-w-3xl flex flex-col items-center">
        {/* Progress bar and round info */}
        <div className="w-full flex flex-col items-center mb-8">
          <div className="flex items-center gap-4 mb-2">
            <span className="px-4 py-1 rounded-full font-bold text-lg shadow" style={{ background: palette.primary, color: palette.textPrimary }}>Round {currentQuestionIdx + 1}</span>
            <span className="px-4 py-1 rounded-full font-bold text-lg shadow" style={{ background: palette.secondary, color: palette.textPrimary }}>Question</span>
          </div>
          <div className="w-full h-3 rounded-full overflow-hidden" style={{ background: palette.surface }}>
            <div className="h-full rounded-full transition-all" style={{ background: `linear-gradient(to right, ${palette.primary}, ${palette.secondary})`, width: `${((currentQuestionIdx + 1) / questions.length) * 100}%` }}></div>
          </div>
        </div>
        {/* Question card */}
        <div className="rounded-2xl shadow-xl p-10 w-full flex flex-col items-center mb-8" style={{ background: palette.surface, border: `2px solid ${palette.primary}` }}>
          <h2 className="text-2xl font-bold mb-6 text-center drop-shadow" style={{ color: palette.textPrimary }}>{currentQuestion.text}</h2>
          <div className="flex gap-8 w-full justify-center">
            {currentQuestion.answers.map((option) => (
              <button
                key={option.id}
                className={highlight.button + ' px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:scale-105 transition-transform min-w-[160px]'}
                style={{ background: palette.primary, color: palette.textPrimary, opacity: selected && selected !== option.value ? 0.5 : 1, border: selected && option.isCorrect ? '2px solid #22c55e' : undefined }}
                onClick={() => handleAnswer(option)}
                disabled={!!selected}
              >
                {option.value}
              </button>
            ))}
          </div>
        </div>
        {/* Score box */}
        <div className="flex items-center gap-4">
          <div className="px-6 py-3 rounded-xl font-bold text-lg shadow flex items-center gap-2" style={{ background: palette.primary, color: palette.textPrimary }}>
            <span className="inline-block w-8 h-8 rounded-full flex items-center justify-center font-bold" style={{ background: palette.accent, color: palette.textPrimary }}>YOU</span>
            <span>Your Score:</span>
            <span className="text-2xl">{currentScore}</span>
          </div>
        </div>
      </div>
    </main>
  );
} 