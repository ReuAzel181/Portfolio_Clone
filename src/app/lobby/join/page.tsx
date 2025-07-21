"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function JoinRoomPage() {
  const [roomCode, setRoomCode] = useState('');
  const router = useRouter();

  const handleJoin = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Call API to join room and redirect to lobby
    alert(`Would join room with code: ${roomCode}`);
    // router.push(`/lobby/${roomCode}`);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4">
      <h2 className="text-2xl font-bold mb-4">Join a Room</h2>
      <form onSubmit={handleJoin} className="flex flex-col gap-4 w-full max-w-sm">
        <input
          type="text"
          placeholder="Room Code"
          value={roomCode}
          onChange={e => setRoomCode(e.target.value)}
          className="border rounded-lg px-4 py-2 uppercase tracking-widest"
          required
        />
        <button type="submit" className="bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition">
          Join Room
        </button>
      </form>
    </main>
  );
} 