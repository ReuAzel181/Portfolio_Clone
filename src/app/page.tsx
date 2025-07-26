"use client";

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import GameModeCard from './components/GameModeCard';
import PlayerStats from './components/PlayerStats';
import BottomNav from './components/BottomNav';
import Image from 'next/image';

// Floating question mark animation
const FloatingIcon = ({ delay, children }: { delay: number, children: React.ReactNode }) => (
  <motion.div
    className="absolute"
    initial={{ scale: 0, opacity: 0 }}
    animate={{ 
      scale: [1, 1.2, 1],
      opacity: [0.3, 0.7, 0.3],
      y: [-20, -40, -20],
    }}
    transition={{
      duration: 3,
      delay,
      repeat: Infinity,
      ease: "easeInOut"
    }}
  >
    {children}
  </motion.div>
);

const gameModes = [
  {
    title: "Quick Play",
    description: "Jump into a fast-paced quiz with random categories",
    color: "border-blue-400",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    )
  },
  {
    title: "Create Room",
    description: "Host a custom quiz room and invite friends",
    color: "border-purple-400",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
      </svg>
    )
  },
  {
    title: "Daily Challenge",
    description: "Complete today's special quiz for bonus rewards",
    color: "border-yellow-400",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
      </svg>
    )
  },
  {
    title: "Tournament",
    description: "Compete in ranked matches for glory",
    color: "border-red-400",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    )
  },
  {
    title: "Practice Mode",
    description: "Train your skills without pressure",
    color: "border-green-400",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    )
  },
  {
    title: "Join Room",
    description: "Enter a room code to join friends",
    color: "border-indigo-400",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
      </svg>
    )
  }
];

export default function Home() {
  const [username, setUsername] = useState('');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const savedUsername = localStorage.getItem('userName');
    if (savedUsername) {
      setUsername(savedUsername);
    }

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="flex flex-row gap-8 max-w-6xl mx-auto py-12 min-h-[calc(100vh-128px)]">
      {/* Left column: Solo Quest */}
      <div className="flex flex-col items-center w-[340px] gap-6">
        <GameModeCard
          title="Solo Quest"
          description="Embark on a solo adventure!"
          icon={<Image src="/assets/Icons/Icon - Info.png" alt="Info" width={32} height={32} />}
          color="border-green-500"
          backgroundImage="/assets/Backgrounds/Backround - Solo Quest.png"
          subjectImage="/assets/Subjects/Subject - Solo Quest.png"
          tall
        />
        <button className="w-full py-5 rounded-2xl bg-green-500 text-white text-3xl font-extrabold shadow-lg hover:scale-105 transition-transform border-4 border-white drop-shadow-xl tracking-wide" style={{fontFamily: 'Fredoka, sans-serif'}}>Solo Quest</button>
      </div>
      {/* Right column: 2x3 grid of other modes */}
      <div className="grid grid-cols-3 grid-rows-2 gap-6 flex-1">
        <GameModeCard
          title="Quick Quiz"
          description="Quick quiz time! Earn prizes and streak up!"
          icon={<Image src="/assets/Icons/Icon - Info.png" alt="Info" width={32} height={32} />}
          color="border-blue-500"
          backgroundImage="/assets/Backgrounds/Background - Quick Quiz.png"
          subjectImage="/assets/Subjects/Subject - Quick Quiz.png"
        />
        <GameModeCard
          title="Party Mode"
          description="Play with friends in a party!"
          icon={<Image src="/assets/Icons/Icon - Info.png" alt="Info" width={32} height={32} />}
          color="border-pink-500"
          backgroundImage="/assets/Backgrounds/Background - Party Mode.png"
          subjectImage="/assets/Subjects/Subject - Party Mode.png"
        />
        <GameModeCard
          title="Think & Type"
          description="Type your answers!"
          icon={<Image src="/assets/Icons/Icon - Info.png" alt="Info" width={32} height={32} />}
          color="border-green-500"
          backgroundImage="/assets/Backgrounds/Background - Think & Type.png"
          subjectImage="/assets/Subjects/Subject - Think & Type.png"
        />
        <GameModeCard
          title="Versus Arena"
          description="Face off in 1v1 battles!"
          icon={<Image src="/assets/Icons/Icon - Info.png" alt="Info" width={32} height={32} />}
          color="border-blue-500"
          backgroundImage="/assets/Backgrounds/Background - Versus Arena.png"
          subjectImage="/assets/Subjects/Subject - Versus Arena.png"
        />
        <GameModeCard
          title="Events"
          description="Special events and rewards!"
          icon={<Image src="/assets/Icons/Icon - Info.png" alt="Info" width={32} height={32} />}
          color="border-yellow-500"
          backgroundImage="/assets/Backgrounds/Background - Events.png"
          subjectImage="/assets/Subjects/Subject - Events.png"
        />
        {/* Empty cell for grid symmetry */}
        <div />
      </div>
    </div>
  );
}
