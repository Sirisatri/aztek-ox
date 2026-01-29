import { auth } from '@/auth';
import Link from 'next/link';
import { SignOutButton } from '@/app/components/SignOutButton';
import { UserProfile } from '@/app/components/UserProfile';
import { FaLock, FaUserShield, FaCheckCircle } from 'react-icons/fa';

export default async function Home() {
  const session = await auth();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <main className="w-full max-w-4xl space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="mb-4 text-5xl font-bold text-gray-900">
            ระบบ OAuth 2.0 Authentication
          </h1>
          <p className="text-xl text-gray-600">
            เข้าสู่ระบบอย่างปลอดภัยด้วย Social Media Providers
          </p>
        </div>

        {/* User Status */}
        <div className="rounded-2xl bg-white p-8 shadow-xl">
          {session ? (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold text-gray-900">
                  คุณเข้าสู่ระบบแล้ว
                </h2>
                <SignOutButton />
              </div>
              <UserProfile />
              <Link
                href="/dashboard"
                className="block rounded-lg bg-blue-600 px-6 py-3 text-center font-medium text-white transition-colors hover:bg-blue-700"
              >
                ไปยัง Dashboard
              </Link>
            </div>
          ) : (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-gray-900">
                เข้าสู่ระบบเพื่อดำเนินการต่อ
              </h2>
              <Link
                href="/login"
                className="block rounded-lg bg-blue-600 px-6 py-3 text-center font-medium text-white transition-colors hover:bg-blue-700"
              >
                เข้าสู่ระบบ
              </Link>
            </div>
          )}
        </div>

        {/* Features */}
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-lg bg-white p-6 shadow-md">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
              <FaLock className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="mb-2 text-lg font-semibold text-gray-900">
              OAuth 2.0 Standard
            </h3>
            <p className="text-gray-600">
              ใช้มาตรฐาน OAuth 2.0 ที่ปลอดภัยและเป็นที่ยอมรับ
            </p>
          </div>

          <div className="rounded-lg bg-white p-6 shadow-md">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
              <FaUserShield className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="mb-2 text-lg font-semibold text-gray-900">
              Multiple Providers
            </h3>
            <p className="text-gray-600">
              รองรับ Google, GitHub, Auth0, Okta และอื่นๆ
            </p>
          </div>

          <div className="rounded-lg bg-white p-6 shadow-md">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-purple-100">
              <FaCheckCircle className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="mb-2 text-lg font-semibold text-gray-900">
              ไม่ต้องพัฒนาเอง
            </h3>
            <p className="text-gray-600">
              ไม่ต้องสร้างระบบสมาชิกและจัดการ password เอง
            </p>
          </div>
        </div>

        {/* Footer Info */}
        <div className="rounded-lg bg-white p-6 text-center shadow-md">
          <p className="text-sm text-gray-600">
            Built with{' '}
            <span className="font-semibold">Next.js 15</span> +{' '}
            <span className="font-semibold">NextAuth.js v5</span> +{' '}
            <span className="font-semibold">TypeScript</span> +{' '}
            <span className="font-semibold">Tailwind CSS</span>
          </p>
        </div>
      </main>
    </div>
  );
}
