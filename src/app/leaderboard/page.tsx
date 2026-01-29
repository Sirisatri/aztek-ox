import { supabase } from '@/lib/supabase';
import Link from 'next/link';

export default async function LeaderboardPage() {
  const { data: scores, error } = await supabase
    .from('user_scores')
    .select('*')
    .order('score', { ascending: false })
    .limit(100);

  if (error) {
    console.error('Error fetching leaderboard:', error);
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-purple-50 to-pink-100 p-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">🏆 กระดานคะแนน</h1>
          <Link
            href="/dashboard"
            className="rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white transition-colors hover:bg-blue-700"
          >
            กลับไปเล่นเกม
          </Link>
        </div>

        <div className="rounded-lg bg-white p-6 shadow-lg">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800">
              ผู้เล่นทั้งหมด {scores?.length || 0} คน
            </h2>
            <p className="text-sm text-gray-600">เรียงตามคะแนนสูงสุด</p>
          </div>

          {!scores || scores.length === 0 ? (
            <div className="py-12 text-center">
              <p className="text-gray-500">ยังไม่มีข้อมูลผู้เล่น</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-gray-200 bg-gray-50">
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                      อันดับ
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                      ผู้เล่น
                    </th>
                    <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">
                      คะแนน
                    </th>
                    <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">
                      ชนะติดต่อกัน
                    </th>
                    <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">
                      ชนะ
                    </th>
                    <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">
                      แพ้
                    </th>
                    <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">
                      เสมอ
                    </th>
                    <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">
                      อัตราชนะ
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {scores.map((score, index) => {
                    const totalGames = score.total_wins + score.total_losses + score.total_draws;
                    const winRate =
                      totalGames > 0 ? ((score.total_wins / totalGames) * 100).toFixed(1) : '0.0';

                    const isTopThree = index < 3;
                    const rankEmoji = index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : '';

                    return (
                      <tr
                        key={score.id}
                        className={`border-b border-gray-100 transition-colors hover:bg-gray-50 ${
                          isTopThree ? 'bg-yellow-50' : ''
                        }`}
                      >
                        <td className="px-4 py-3 text-sm font-semibold">
                          {rankEmoji} #{index + 1}
                        </td>
                        <td className="px-4 py-3">
                          <div>
                            <div className="font-medium text-gray-900">{score.user_name}</div>
                            <div className="text-xs text-gray-500">{score.user_email}</div>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-center">
                          <span
                            className={`inline-block rounded px-3 py-1 text-lg font-bold ${
                              score.score > 0
                                ? 'bg-green-100 text-green-700'
                                : score.score < 0
                                  ? 'bg-red-100 text-red-700'
                                  : 'bg-gray-100 text-gray-700'
                            }`}
                          >
                            {score.score}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-center">
                          {score.win_streak > 0 && (
                            <span className="inline-block rounded bg-orange-100 px-2 py-1 text-sm font-semibold text-orange-700">
                              🔥 {score.win_streak}
                            </span>
                          )}
                          {score.win_streak === 0 && (
                            <span className="text-sm text-gray-400">-</span>
                          )}
                        </td>
                        <td className="px-4 py-3 text-center text-sm font-medium text-green-600">
                          {score.total_wins}
                        </td>
                        <td className="px-4 py-3 text-center text-sm font-medium text-red-600">
                          {score.total_losses}
                        </td>
                        <td className="px-4 py-3 text-center text-sm font-medium text-gray-600">
                          {score.total_draws}
                        </td>
                        <td className="px-4 py-3 text-center text-sm font-medium text-blue-600">
                          {winRate}%
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div className="mt-6 rounded-lg bg-blue-50 p-4">
          <h3 className="mb-2 font-semibold text-blue-900">💡 เคล็ดลับ:</h3>
          <ul className="space-y-1 text-sm text-blue-800">
            <li>• ชนะบอท = +1 คะแนน</li>
            <li>• แพ้บอท = -1 คะแนน</li>
            <li>• ชนะ 3 ครั้งติดต่อกัน = +1 คะแนนพิเศษ</li>
            <li>• อัตราชนะคำนวณจากจำนวนครั้งที่ชนะ ÷ จำนวนเกมทั้งหมด</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
