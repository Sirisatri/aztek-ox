import { UserProfile } from '@/app/components/UserProfile';
import { SignOutButton } from '@/app/components/SignOutButton';
import { TicTacToeGame } from '@/app/components/TicTacToeGame';
import { auth } from '@/auth';
import Link from 'next/link';

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user) {
    return null;
  }

  const userId = session.user.email || 'unknown';
  const userName = session.user.name || 'Unknown User';
  const userEmail = session.user.email || 'no-email@example.com';

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 p-4 md:p-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <h1 className="text-3xl font-bold text-gray-900">🎮 OX Game (Tic-tac-toe)</h1>
          <div className="flex gap-3">
            <Link
              href="/leaderboard"
              className="rounded-lg bg-purple-600 px-4 py-2 font-semibold text-white transition-colors hover:bg-purple-700"
            >
              🏆 กระดานคะแนน
            </Link>
            <SignOutButton />
          </div>
        </div>

        <div className="space-y-6">
          <UserProfile />
          
          <TicTacToeGame userId={userId} userName={userName} userEmail={userEmail} />
        </div>
      </div>
    </div>
  );
}
