// Color palette for TaraG
// Light mode and dark mode

export const colors = {
  light: {
    primary: '#7C3AED', // Vivid Violet
    primaryLight: '#DDD6FE', // Soft Lilac
    accent: '#06B6D4', // Cyan Flash
    secondary: '#EC4899', // Flaming Pink
    highlight: '#FACC15', // Bright Yellow
    background: '#F8FAFC', // Snow Gray
    surface: '#F3E8FF', // Pale Lavender
    textPrimary: '#1E293B', // Deep Slate
    textSecondary: '#64748B', // Cool Gray
    border: '#C4B5FD', // Indigo Mist
  },
  dark: {
    primary: '#8B5CF6', // Vivid Violet
    primaryDeep: '#6D28D9', // Electric Indigo
    accent: '#06B6D4', // Neon Cyan
    secondary: '#EC4899', // Hot Pink
    highlight: '#FACC15', // Soft Yellow
    background: '#0F172A', // Midnight Slate
    surface: '#1E1B4B', // Deep Charcoal
    textPrimary: '#F8FAFC', // Light Lavender
    textSecondary: '#94A3B8', // Gray Lilac
    border: '#4C1D95', // Indigo Edge
  },
  highlights: {
    light: {
      button: 'bg-purple-600 text-white',
      quizCard: 'bg-purple-100 text-slate-800',
      correctAnswer: 'text-green-600',
      wrongAnswer: 'text-red-500',
      highlight: 'text-yellow-400',
      accentHover: 'hover:text-cyan-500',
    },
    dark: {
      button: 'bg-purple-500 hover:bg-purple-700',
      quizCard: 'bg-indigo-950 text-slate-50',
      correctAnswer: 'text-green-400',
      wrongAnswer: 'text-red-400',
      highlight: 'text-yellow-400',
      accentHover: 'hover:text-cyan-400',
    },
  },
}; 