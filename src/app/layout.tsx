import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TaraG - Quiz Game",
  description: "A multiplayer quiz game platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-900 dark:to-purple-900 min-h-screen`}
      >
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-purple-100 dark:border-purple-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <Link 
                  href="/" 
                  className="flex items-center space-x-2 text-xl font-bold text-purple-900 dark:text-white hover:text-purple-700 dark:hover:text-purple-300 transition-colors"
                >
                  <span className="text-2xl">🎮</span>
                  <span>TaraG</span>
                </Link>
              </div>
              <div className="flex items-center space-x-4">
                <Link 
                  href="/profile" 
                  className="px-4 py-2 rounded-full text-sm font-medium text-purple-700 hover:text-purple-900 hover:bg-purple-100 dark:text-purple-300 dark:hover:text-white dark:hover:bg-purple-800 transition-all"
                >
                  Profile
                </Link>
                <button 
                  className="px-4 py-2 rounded-full text-sm font-medium bg-purple-600 text-white hover:bg-purple-700 transition-colors"
                >
                  Login
                </button>
              </div>
            </div>
          </div>
        </nav>
        <main className="pt-16 min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}
