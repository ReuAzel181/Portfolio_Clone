"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Header() {
  const [username, setUsername] = useState('');
  const [isInputFocused, setIsInputFocused] = useState(false);

  useEffect(() => {
    const savedUsername = localStorage.getItem('userName');
    if (savedUsername) {
      setUsername(savedUsername);
    }
  }, []);

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newUsername = e.target.value;
    setUsername(newUsername);
    localStorage.setItem('userName', newUsername);
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className="fixed top-0 left-0 right-0 bg-white/70 backdrop-blur-lg shadow-sm z-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
        <div className="flex items-center justify-between">
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
            <Link href="/" className="flex items-center gap-2">
              <motion.div 
                className="relative w-8 h-8"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <Image
                  src="/globe.svg"
                  alt="TaraG Logo"
                  fill
                  className="object-contain"
                />
              </motion.div>
              <motion.span 
                className="text-lg font-bold bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                TaraG
              </motion.span>
            </Link>
          </motion.div>
          
          <motion.div 
            className="relative group"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <motion.div
              className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-purple-800 rounded-full opacity-20 blur"
              animate={{
                opacity: isInputFocused ? 0.3 : 0.2,
                scale: isInputFocused ? 1.02 : 1,
              }}
              transition={{ duration: 0.2 }}
            />
            <input
              type="text"
              placeholder="What's your name? 😊"
              value={username}
              onChange={handleUsernameChange}
              onFocus={() => setIsInputFocused(true)}
              onBlur={() => setIsInputFocused(false)}
              className="px-3 py-1.5 pr-8 rounded-full border border-purple-200 
                       focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500
                       transition-all duration-200 ease-in-out
                       placeholder:text-gray-400 text-gray-700 text-sm
                       shadow-sm hover:shadow-md
                       bg-white/80 backdrop-blur-sm relative z-10"
            />
            {username && (
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-green-500 z-20"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
                </svg>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </motion.header>
  );
} 