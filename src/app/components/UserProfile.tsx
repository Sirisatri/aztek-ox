import { auth } from '@/auth';
import Image from 'next/image';

export async function UserProfile() {
  const session = await auth();

  if (!session?.user) return null;

  return (
    <div className="flex items-center gap-3 rounded-lg bg-white p-4 shadow-md">
      {session.user.image && (
        <Image
          src={session.user.image}
          alt={session.user.name || 'User'}
          width={48}
          height={48}
          className="rounded-full"
        />
      )}
      <div>
        <p className="font-semibold text-gray-900">{session.user.name}</p>
        <p className="text-sm text-gray-600">{session.user.email}</p>
      </div>
    </div>
  );
}
