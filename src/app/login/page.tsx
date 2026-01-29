import { signIn } from '@/auth';
import { FaGoogle, FaGithub } from 'react-icons/fa';

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="w-full max-w-md space-y-8 rounded-2xl bg-white p-10 shadow-2xl">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">เข้าสู่ระบบ</h2>
          <p className="mt-2 text-sm text-gray-600">
            กรุณาเข้าสู่ระบบ
          </p>
        </div>

        <div className="mt-8 space-y-4">
          {/* Google Sign In */}
          <form
            action={async () => {
              'use server';
              await signIn('google', { redirectTo: '/dashboard' });
            }}
          >
            <button
              type="submit"
              className="flex w-full items-center justify-center gap-3 rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-700 shadow-sm transition-all hover:bg-gray-50 hover:shadow-md"
            >
              <FaGoogle className="h-5 w-5 text-red-500" />
              <span className="font-medium">เข้าสู่ระบบด้วย Google</span>
            </button>
          </form>

          {/* GitHub Sign In */}
          {/* <form
            action={async () => {
              'use server';
              await signIn('github', { redirectTo: '/dashboard' });
            }}
          >
            <button
              type="submit"
              className="flex w-full items-center justify-center gap-3 rounded-lg border border-gray-300 bg-gray-900 px-4 py-3 text-white shadow-sm transition-all hover:bg-gray-800 hover:shadow-md"
            >
              <FaGithub className="h-5 w-5" />
              <span className="font-medium">เข้าสู่ระบบด้วย GitHub</span>
            </button>
          </form> */}

          {/* Divider */}
          {/* <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-2 text-gray-500">
                หรือเพิ่ม provider อื่นๆ
              </span>
            </div>
          </div> */}

          {/* Instructions */}
          {/* <div className="rounded-lg bg-blue-50 p-4">
            <p className="text-xs text-blue-800">
              <strong>💡 สำหรับการใช้งาน:</strong> กรุณาตั้งค่า environment
              variables ใน .env.local ก่อนใช้งาน
            </p>
          </div> */}
        </div>

        {/* Additional Provider Info */}
        {/* <div className="mt-6 text-center text-xs text-gray-500">
          <p>รองรับ OAuth 2.0 providers อื่นๆ เช่น</p>
          <p className="mt-1 font-medium">Auth0, Okta, Facebook, Twitter และอื่นๆ</p>
        </div> */}
      </div>
    </div>
  );
}
