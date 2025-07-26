import { motion } from 'framer-motion';
import { ReactNode, useMemo, useEffect, useState } from 'react';
import Image from 'next/image';

interface GameModeCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  color: string;
  backgroundImage: string; // new prop: path to background image
  subjectImage: string;    // new prop: path to subject/character image
  onClick?: () => void;
  tall?: boolean;
}

export default function GameModeCard({ title, description, icon, color, backgroundImage, subjectImage, onClick, tall }: GameModeCardProps) {
  // Only render sparkles on client to avoid hydration mismatch
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  const sparkles = useMemo(() => (
    [...Array(5)].map((_, i) => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      x: Math.random() * 40 - 20,
      y: Math.random() * 40 - 20,
      delay: i * 0.2,
    }))
  ), []);

  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`relative cursor-pointer border-4 ${color} rounded-3xl flex flex-col items-center justify-between ${tall ? 'h-[420px] min-h-[420px] max-h-[420px] w-full' : 'h-[180px] min-h-[180px] max-h-[180px] w-full'} overflow-hidden bg-white/0`}
      onClick={onClick}
      style={{ background: `url('${backgroundImage}') center/cover no-repeat` }}
    >
      {/* Info icon in upper right, outside border */}
      <div className="absolute -top-5 -right-5 z-20 flex items-center justify-center">
        <Image src="/assets/Icons/Icon - Info.png" alt="Info" width={56} height={56} className="drop-shadow-lg" />
      </div>
      {/* Subject image (character/mascot) */}
      <div className={`w-24 h-24 ${tall ? 'mt-6 mb-2' : 'mt-2 mb-1'} flex items-center justify-center drop-shadow-xl`}>
        <img
          src={subjectImage}
          alt="Subject"
          className="w-full h-full object-contain object-bottom select-none pointer-events-none"
          draggable={false}
        />
      </div>
      <h3 className="text-xl font-extrabold text-gray-900 mb-1 text-center drop-shadow-md">
        {title}
      </h3>
      <p className="text-base text-gray-700 font-semibold text-center drop-shadow-sm mb-4">
        {description}
      </p>
    </motion.div>
  );
} 