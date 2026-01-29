import { signOut } from '@/auth';
import { FaSignOutAlt } from 'react-icons/fa';

export function SignOutButton() {
  return (
    <form
      action={async () => {
        'use server';
        await signOut({ redirectTo: '/login' });
      }}
    >
      <button
        type="submit"
        className="flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-white transition-colors hover:bg-red-700"
      >
        <FaSignOutAlt />
        <span>ออกจากระบบ</span>
      </button>
    </form>
  );
}
