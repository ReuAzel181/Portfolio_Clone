import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface GameModeCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  color: string;
  onClick?: () => void;
}

export default function GameModeCard({ title, description, icon, color, onClick }: GameModeCardProps) {
  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="relative cursor-pointer"
      onClick={onClick}
    >
      <div className={`bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border-2 transition-all duration-300 h-full
                      hover:shadow-xl group ${color}`}>
        {/* Animated glow effect */}
        <motion.div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle at 50% 50%, ${color.split('border-')[1]} 0%, transparent 70%)`,
            filter: 'blur(20px)',
            zIndex: -1
          }}
        />

        {/* Floating sparkles */}
        <motion.div
          className="absolute -inset-2 opacity-0 group-hover:opacity-100"
          initial={false}
        >
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className={`absolute w-1 h-1 rounded-full bg-${color.split('border-')[1]}`}
              animate={{
                x: [0, Math.random() * 40 - 20],
                y: [0, Math.random() * 40 - 20],
                scale: [0, 1, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeInOut",
              }}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </motion.div>

        {/* Icon container with pulsing effect */}
        <div className="mb-4 w-16 h-16 rounded-full flex items-center justify-center relative">
          <motion.div
            className={`absolute inset-0 rounded-full bg-${color.split('border-')[1]}/20`}
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <div className="relative z-10">
            {icon}
          </div>
        </div>

        <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-purple-600 transition-colors">
          {title}
        </h3>

        {/* Description with fade in effect */}
        <motion.p
          initial={{ opacity: 0, height: 0 }}
          animate={{ 
            opacity: 1,
            height: "auto",
            transition: { duration: 0.2 }
          }}
          className="text-sm text-gray-600 overflow-hidden"
        >
          {description}
        </motion.p>
      </div>
    </motion.div>
  );
} 