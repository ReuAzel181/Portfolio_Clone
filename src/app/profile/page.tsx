'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { colors } from '@/utils/colors';

export default function ProfilePage() {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Load saved user data from localStorage
    const storedName = localStorage.getItem('userName');
    const storedUserId = localStorage.getItem('userId');
    if (storedName) {
      setName(storedName);
    }
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      let response;
      
      if (userId) {
        // Update existing user
        response = await fetch('/api/user/profile', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: userId, name }),
        });
      } else {
        // Create new user
        response = await fetch('/api/user/profile', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name }),
        });
      }

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to save profile');
      }

      // Save to localStorage
      localStorage.setItem('userName', name);
      localStorage.setItem('userId', data.id);
      setUserId(data.id);
      
      router.push('/'); // Redirect to home page after saving
    } catch (error: unknown) {
      console.error('Error updating profile:', error);
      setError(error instanceof Error ? error.message : 'Failed to update profile');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ background: colors.light.background }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div 
          className="p-8 rounded-2xl shadow-xl"
          style={{ 
            background: colors.light.surface,
            borderColor: colors.light.border,
            borderWidth: '1px'
          }}
        >
          <div className="text-center mb-8">
            <div 
              className="w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center"
              style={{ background: colors.light.primaryLight }}
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-10 w-10" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke={colors.light.primary}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h1 
              className="text-2xl font-bold mb-2"
              style={{ color: colors.light.textPrimary }}
            >
              Your Profile
            </h1>
            <p style={{ color: colors.light.textSecondary }}>
              Set your name for quiz games
            </p>
          </div>
          
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 rounded-lg text-sm bg-red-50 text-red-700 border border-red-200"
            >
              {error}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label 
                htmlFor="name" 
                className="block text-sm font-medium mb-2"
                style={{ color: colors.light.textPrimary }}
              >
                Display Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 transition-colors"
                style={{ 
                  background: colors.light.background,
                  borderColor: colors.light.border,
                  color: colors.light.textPrimary,
                  caretColor: colors.light.primary
                }}
                placeholder="Enter your name"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 rounded-lg font-medium transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ 
                background: colors.light.primary,
                color: 'white',
                borderColor: colors.light.primary
              }}
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Saving...
                </span>
              ) : (
                'Save Profile'
              )}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
} 