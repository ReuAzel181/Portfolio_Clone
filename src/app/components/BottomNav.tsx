import { motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

const navItems = [
  {
    key: 'home',
    icon: <Image src="/assets/Icons/Icon - Home.png" alt="Home" width={36} height={36} style={{ filter: 'brightness(0) invert(1) drop-shadow(0 2px 4px rgba(0,0,0,0.18))' }} />
  },
  {
    key: 'boosters',
    icon: <Image src="/assets/Icons/Icon - Boosters.png" alt="Boosters" width={36} height={36} style={{ filter: 'brightness(0) invert(1) drop-shadow(0 2px 4px rgba(0,0,0,0.18))' }} />
  },
  {
    key: 'store',
    icon: <Image src="/assets/Icons/Icon - Store.png" alt="Store" width={36} height={36} style={{ filter: 'brightness(0) invert(1) drop-shadow(0 2px 4px rgba(0,0,0,0.18))' }} />
  },
  {
    key: 'trophy',
    icon: <Image src="/assets/Icons/Icon - Trophy.png" alt="Trophy" width={36} height={36} style={{ filter: 'brightness(0) invert(1) drop-shadow(0 2px 4px rgba(0,0,0,0.18))' }} />
  }
];

export default function BottomNav() {
  return (
    <nav
      className="fixed left-4 top-1/2 -translate-y-1/2 h-[380px] w-[76px] flex flex-col items-center justify-center bg-gradient-to-b from-[#6D28D9] to-[#7C3AED] rounded-full shadow-2xl z-50"
      style={{ padding: '32px 0', gap: '32px' }}
    >
      <div className="flex flex-col items-center justify-center w-full h-full gap-8">
        {navItems.map((item, idx) => (
          <div key={item.key} className="flex items-center justify-center w-full h-16">
            {item.icon}
          </div>
        ))}
      </div>
    </nav>
  );
} 