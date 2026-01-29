export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-purple-50 to-blue-100 p-4">
      <main className="w-full max-w-2xl space-y-8 text-center">
        {/* Header */}
        <div className="space-y-4">
          <h1 className="text-6xl font-bold text-gray-900">
            🎮 OX Game
          </h1>
          <p className="text-2xl text-gray-700">
            ยินดีต้อนรับ
          </p>
          <p className="text-lg text-gray-600">
            เกมติกแทกโตซ สุดสนุกเพลิดเพลินกับ AI
          </p>
        </div>

        {/* CTA Button */}
        <div className="pt-4">
          <a
            href="/login"
            className="inline-block rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-4 text-lg font-semibold text-white transition-all hover:shadow-lg hover:scale-105"
          >
            เริ่มเล่น
          </a>
        </div>

        {/* Footer Info */}
        <div className="rounded-lg bg-white p-6 text-center shadow-md">
          <p className="text-sm text-gray-600">
            สนุกสนาน • เล่นได้ฟรี • มีระบบคะแนน
          </p>
        </div>
      </main>
    </div>
  );
}
