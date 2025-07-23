import { motion } from 'framer-motion';
import Image from 'next/image';

interface PlayerStatsProps {
  username: string;
  level: number;
  coins: number;
  xp: number;
  xpRequired: number;
  avatarUrl?: string;
}

export default function PlayerStats({ username, level, coins, xp, xpRequired, avatarUrl }: PlayerStatsProps) {
  const progress = (xp / xpRequired) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/90 backdrop-blur-lg rounded-2xl p-4 shadow-lg border border-purple-100"
    >
      <div className="flex items-center gap-4">
        {/* Avatar with level badge */}
        <div className="relative">
          <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-purple-200">
            {avatarUrl ? (
              <Image
                src={avatarUrl}
                alt={username}
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full bg-purple-100 flex items-center justify-center">
                <span className="text-2xl font-bold text-purple-600">
                  {username.charAt(0).toUpperCase()}
                </span>
              </div>
            )}
          </div>
          <motion.div
            className="absolute -bottom-1 -right-1 bg-purple-600 rounded-full w-6 h-6 flex items-center justify-center border-2 border-white"
            whileHover={{ scale: 1.1 }}
          >
            <span className="text-xs font-bold text-white">{level}</span>
          </motion.div>
        </div>

        {/* Player info */}
        <div className="flex-1">
          <h2 className="font-bold text-gray-800 mb-1">{username}</h2>
          
          {/* XP Progress bar */}
          <div className="relative h-2 bg-purple-100 rounded-full mb-2">
            <motion.div
              className="absolute left-0 top-0 h-full bg-purple-600 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
          </div>
          
          <div className="flex justify-between text-xs text-gray-600">
            <span>{xp} / {xpRequired} XP</span>
            <motion.div
              className="flex items-center gap-1"
              whileHover={{ scale: 1.05 }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
                <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
              </svg>
              <span className="font-medium text-yellow-600">{coins}</span>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
} 