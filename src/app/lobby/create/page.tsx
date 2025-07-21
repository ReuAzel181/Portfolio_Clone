"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CreateRoomPage() {
  const [quizTitle, setQuizTitle] = useState('');
  const router = useRouter();

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Call API to create room and redirect to lobby
    alert(`Room for quiz '${quizTitle}' would be created!`);
    // router.push(`/lobby/ROOM_ID`);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4">
      <h2 className="text-2xl font-bold mb-4">Create a New Room</h2>
      <form onSubmit={handleCreate} className="flex flex-col gap-4 w-full max-w-sm">
        <input
          type="text"
          placeholder="Quiz Title"
          value={quizTitle}
          onChange={e => setQuizTitle(e.target.value)}
          className="border rounded-lg px-4 py-2"
          required
        />
        <button type="submit" className="bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition">
          Create Room
        </button>
      </form>
    </main>
  );
} 