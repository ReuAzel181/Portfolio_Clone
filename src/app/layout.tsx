import { Lilita_One } from 'next/font/google';
import './globals.css';
import Header from './components/Header';

const lilitaOne = Lilita_One({ subsets: ['latin'], weight: '400' });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={lilitaOne.className + " relative min-h-screen bg-[#8B5CF6] bg-gradient-to-br from-purple-400 via-purple-300 to-yellow-100 overflow-hidden bg-[url('/assets/Backgrounds/Full%20Background.png')] bg-cover bg-center"}>
        <Header />
        <main className="min-h-screen pt-20">
          {children}
        </main>
      </body>
    </html>
  );
}
