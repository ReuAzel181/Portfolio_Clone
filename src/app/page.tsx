import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4">
      <h1 className="text-4xl font-bold mb-6">TaraG Quiz Game</h1>
      <div className="flex flex-col gap-4 w-full max-w-sm">
        <Link href="/lobby/create" className="bg-blue-600 text-white py-3 rounded-lg text-center font-semibold hover:bg-blue-700 transition">Create Room</Link>
        <Link href="/lobby/join" className="bg-white border border-blue-600 text-blue-600 py-3 rounded-lg text-center font-semibold hover:bg-blue-50 transition">Join Room</Link>
      </div>
    </main>
  );
}
