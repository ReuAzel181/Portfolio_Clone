'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-purple-900 dark:text-white mb-4">
          Welcome to TaraG
        </h1>
        <p className="text-lg text-purple-700 dark:text-purple-300">
          Create or join a quiz room and challenge your friends!
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl w-full">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="group"
        >
          <Link href="/lobby/create">
            <div className="h-full p-8 rounded-2xl bg-white/80 dark:bg-gray-800/50 backdrop-blur-sm border border-purple-100 dark:border-purple-800 hover:border-purple-300 dark:hover:border-purple-600 transition-all shadow-lg hover:shadow-xl">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-16 h-16 flex items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300 group-hover:scale-110 transition-transform">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-purple-900 dark:text-white">Create Room</h2>
                <p className="text-purple-600 dark:text-purple-300">Start a new quiz and invite friends</p>
              </div>
            </div>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="group"
        >
          <Link href="/lobby/join">
            <div className="h-full p-8 rounded-2xl bg-white/80 dark:bg-gray-800/50 backdrop-blur-sm border border-purple-100 dark:border-purple-800 hover:border-purple-300 dark:hover:border-purple-600 transition-all shadow-lg hover:shadow-xl">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-16 h-16 flex items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300 group-hover:scale-110 transition-transform">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-purple-900 dark:text-white">Join Room</h2>
                <p className="text-purple-600 dark:text-purple-300">Enter a room code to play</p>
              </div>
            </div>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
