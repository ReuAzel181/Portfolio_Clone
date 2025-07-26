"use client";

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Mock data for demo
const MOCK = {
  avatarUrl: '', // Set to a URL string for a real avatar
  level: 7,
  xp: 320,
  xpRequired: 500,
  coins: 1234,
  boosters: 3,
  notifications: 2,
};

export default function Header() {
  const [username, setUsername] = useState('');
  useEffect(() => {
    const savedUsername = localStorage.getItem('userName');
    if (savedUsername) setUsername(savedUsername);
  }, []);
  // XP progress
  const level = 5;
  const xp = 60;
  const xpRequired = 100;
  const progress = Math.min((xp / xpRequired) * 100, 100);
  const coins = 3000;
  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-[72px] flex items-center justify-between px-12" style={{ background: 'linear-gradient(90deg, #6D28D9 0%, #7C3AED 100%)' }}>
      {/* Left: Avatar, Username, Progress */}
      <div className="flex items-center gap-5 min-w-0">
        {/* Avatar with level badge */}
        <div className="relative w-16 h-16 flex items-center justify-center">
          <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center border-4 border-[#6D28D9]">
            <span className="text-3xl font-black text-[#6D28D9] drop-shadow-sm" style={{ WebkitTextStroke: '2px #fff' }}>
              {username ? username.charAt(0).toUpperCase() : '?'}
            </span>
          </div>
          <div className="absolute bottom-0 right-0 w-7 h-7 rounded-full bg-black flex items-center justify-center border-2 border-white">
            <span className="text-sm font-bold text-white">{level}</span>
          </div>
        </div>
        {/* Username and progress */}
        <div className="flex flex-col justify-center">
          <span className="text-3xl font-black text-white drop-shadow-md uppercase tracking-wide" style={{ WebkitTextStroke: '2.5px #000', letterSpacing: '0.04em' }}>{username || 'GUEST'}</span>
          <div className="w-[110px] h-3 bg-white rounded-full mt-2">
            <div className="h-3 rounded-full bg-gradient-to-r from-pink-500 to-purple-400" style={{ width: `${progress}%` }}></div>
          </div>
        </div>
      </div>
      {/* Right: D Coin, Notification, Settings */}
      <div className="flex items-center gap-10">
        {/* D Coin */}
        <div className="flex items-center bg-[#3B2177] rounded-full px-7 py-2 shadow-2xl gap-3 min-w-[130px] justify-center" style={{ minHeight: '48px' }}>
          <Image src="/assets/Icons/Icon - D Coin.png" alt="Coin" width={36} height={36} />
          <span className="text-yellow-300 font-black text-3xl drop-shadow-md" style={{ WebkitTextStroke: '2.5px #000', fontFamily: 'Fredoka, sans-serif' }}>{coins.toLocaleString()}</span>
        </div>
        {/* Notification */}
        <Image src="/assets/Icons/Icon - Notification.png" alt="Notification" width={38} height={38} style={{ filter: 'brightness(0) invert(1) drop-shadow(0 2px 4px rgba(0,0,0,0.18))' }} />
        {/* Settings */}
        <Image src="/assets/Icons/Icon - Settings.png" alt="Settings" width={38} height={38} style={{ filter: 'brightness(0) invert(1) drop-shadow(0 2px 4px rgba(0,0,0,0.18))' }} />
      </div>
    </header>
  );
} 