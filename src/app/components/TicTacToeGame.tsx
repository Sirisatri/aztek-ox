'use client';

import { useState, useEffect } from 'react';
import { checkWinner, isBoardFull, getBotMove, type Board, type Player } from '@/lib/gameLogic';
import { supabase, type UserScore } from '@/lib/supabase';

interface TicTacToeGameProps {
  userEmail: string;
  userName: string;
  userId: string;
}

export function TicTacToeGame({ userEmail, userName, userId }: TicTacToeGameProps) {
  const [board, setBoard] = useState<Board>(Array(9).fill(null));
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  const [gameStatus, setGameStatus] = useState<'playing' | 'won' | 'lost' | 'draw'>('playing');
  const [userScore, setUserScore] = useState<UserScore | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchUserScore();
  }, [userId]);

  useEffect(() => {
    if (!isPlayerTurn && gameStatus === 'playing') {
      const timer = setTimeout(() => {
        makeBotMove();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isPlayerTurn, gameStatus]);

  async function fetchUserScore() {
    try {
      const { data, error } = await supabase
        .from('user_scores')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching score:', error);
        return;
      }

      if (!data) {
        // Create new user score entry
        const newUserScore: UserScore = {
          user_id: userId,
          user_email: userEmail,
          user_name: userName,
          score: 0,
          win_streak: 0,
          total_wins: 0,
          total_losses: 0,
          total_draws: 0,
        };

        const { data: created, error: createError } = await supabase
          .from('user_scores')
          .insert(newUserScore)
          .select()
          .single();

        if (createError) {
          console.error('Error creating score:', createError);
          return;
        }

        setUserScore(created);
      } else {
        setUserScore(data);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  async function updateScore(result: 'win' | 'loss' | 'draw') {
    if (!userScore) return;

    setIsLoading(true);
    try {
      let scoreChange = 0;
      let newWinStreak = userScore.win_streak;
      let bonusEarned = false;

      if (result === 'win') {
        scoreChange = 1;
        newWinStreak += 1;

        // Check for 3-win streak bonus
        if (newWinStreak === 3) {
          scoreChange += 1;
          bonusEarned = true;
          newWinStreak = 0; // Reset streak
          setMessage('🎉 3 ครั้งติดต่อกัน! ได้คะแนนพิเศษ +1');
        }
      } else if (result === 'loss') {
        scoreChange = -1;
        newWinStreak = 0; // Reset streak on loss
      } else {
        newWinStreak = 0; // Reset streak on draw
      }

      const newScore = userScore.score + scoreChange;
      const newTotalWins = result === 'win' ? userScore.total_wins + 1 : userScore.total_wins;
      const newTotalLosses = result === 'loss' ? userScore.total_losses + 1 : userScore.total_losses;
      const newTotalDraws = result === 'draw' ? userScore.total_draws + 1 : userScore.total_draws;

      // Update user_scores
      const { error: updateError } = await supabase
        .from('user_scores')
        .update({
          score: newScore,
          win_streak: newWinStreak,
          total_wins: newTotalWins,
          total_losses: newTotalLosses,
          total_draws: newTotalDraws,
          updated_at: new Date().toISOString(),
        })
        .eq('user_id', userId);

      if (updateError) throw updateError;

      // Insert game history
      const { error: historyError } = await supabase.from('game_history').insert({
        user_id: userId,
        result,
        score_change: scoreChange,
        win_streak_after: newWinStreak,
        bonus_earned: bonusEarned,
      });

      if (historyError) throw historyError;

      // Update local state
      setUserScore({
        ...userScore,
        score: newScore,
        win_streak: newWinStreak,
        total_wins: newTotalWins,
        total_losses: newTotalLosses,
        total_draws: newTotalDraws,
      });
    } catch (error) {
      console.error('Error updating score:', error);
      setMessage('เกิดข้อผิดพลาดในการบันทึกคะแนน');
    } finally {
      setIsLoading(false);
    }
  }

  function handleCellClick(index: number) {
    if (board[index] || !isPlayerTurn || gameStatus !== 'playing') return;

    const newBoard = [...board];
    newBoard[index] = 'X';
    setBoard(newBoard);

    const winner = checkWinner(newBoard);
    if (winner === 'X') {
      setGameStatus('won');
      updateScore('win');
      return;
    }

    if (isBoardFull(newBoard)) {
      setGameStatus('draw');
      updateScore('draw');
      return;
    }

    setIsPlayerTurn(false);
  }

  function makeBotMove() {
    const botMoveIndex = getBotMove(board);
    if (botMoveIndex === -1) return;

    const newBoard = [...board];
    newBoard[botMoveIndex] = 'O';
    setBoard(newBoard);

    const winner = checkWinner(newBoard);
    if (winner === 'O') {
      setGameStatus('lost');
      updateScore('loss');
      return;
    }

    if (isBoardFull(newBoard)) {
      setGameStatus('draw');
      updateScore('draw');
      return;
    }

    setIsPlayerTurn(true);
  }

  function resetGame() {
    setBoard(Array(9).fill(null));
    setIsPlayerTurn(true);
    setGameStatus('playing');
    setMessage('');
  }

  function getCellClassName(index: number): string {
    const baseClass =
      'w-24 h-24 border-2 border-gray-400 text-4xl font-bold flex items-center justify-center cursor-pointer transition-all hover:bg-gray-100';

    if (board[index] === 'X') return `${baseClass} text-blue-600`;
    if (board[index] === 'O') return `${baseClass} text-red-600`;
    return baseClass;
  }

  return (
    <div className="space-y-6">
      {/* Score Display */}
      {userScore && (
        <div className="rounded-lg bg-linear-to-r from-purple-50 to-pink-50 p-6 shadow-md">
          <h3 className="mb-4 text-xl font-bold text-gray-900">📊 สถิติของคุณ</h3>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
            <div className="rounded bg-white p-3 text-center shadow">
              <div className="text-2xl font-bold text-purple-600">{userScore.score}</div>
              <div className="text-sm text-gray-600">คะแนน</div>
            </div>
            <div className="rounded bg-white p-3 text-center shadow">
              <div className="text-2xl font-bold text-orange-600">{userScore.win_streak}</div>
              <div className="text-sm text-gray-600">ชนะติดต่อกัน</div>
            </div>
            <div className="rounded bg-white p-3 text-center shadow">
              <div className="text-2xl font-bold text-green-600">{userScore.total_wins}</div>
              <div className="text-sm text-gray-600">ชนะทั้งหมด</div>
            </div>
            <div className="rounded bg-white p-3 text-center shadow">
              <div className="text-2xl font-bold text-red-600">{userScore.total_losses}</div>
              <div className="text-sm text-gray-600">แพ้ทั้งหมด</div>
            </div>
            <div className="rounded bg-white p-3 text-center shadow">
              <div className="text-2xl font-bold text-gray-600">{userScore.total_draws}</div>
              <div className="text-sm text-gray-600">เสมอทั้งหมด</div>
            </div>
          </div>
        </div>
      )}

      {/* Game Status */}
      <div className="rounded-lg bg-white p-6 shadow-md">
        <div className="mb-4 text-center">
          {gameStatus === 'playing' && (
            <p className="text-lg font-semibold text-gray-700">
              {isPlayerTurn ? '🎮 เทิร์นของคุณ (X)' : '🤖 บอทกำลังคิด... (O)'}
            </p>
          )}
          {gameStatus === 'won' && (
            <p className="text-lg font-bold text-green-600">🎉 คุณชนะ! +1 คะแนน</p>
          )}
          {gameStatus === 'lost' && (
            <p className="text-lg font-bold text-red-600">😢 คุณแพ้! -1 คะแนน</p>
          )}
          {gameStatus === 'draw' && (
            <p className="text-lg font-bold text-gray-600">🤝 เสมอ! ไม่มีการเปลี่ยนแปลงคะแนน</p>
          )}
          {message && <p className="mt-2 text-sm font-semibold text-purple-600">{message}</p>}
        </div>

        {/* Game Board */}
        <div className="mx-auto grid w-fit grid-cols-3 gap-2">
          {board.map((cell, index) => (
            <button
              key={index}
              className={getCellClassName(index)}
              onClick={() => handleCellClick(index)}
              disabled={!isPlayerTurn || gameStatus !== 'playing' || isLoading}
            >
              {cell}
            </button>
          ))}
        </div>

        {/* Reset Button */}
        {gameStatus !== 'playing' && (
          <div className="mt-6 text-center">
            <button
              onClick={resetGame}
              disabled={isLoading}
              className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-700 disabled:bg-gray-400"
            >
              {isLoading ? 'กำลังบันทึก...' : 'เล่นอีกครั้ง'}
            </button>
          </div>
        )}

        {/* Game Rules */}
        <div className="mt-6 rounded border border-blue-200 bg-blue-50 p-4">
          <h4 className="mb-2 font-semibold text-blue-900">📜 กติกาการให้คะแนน:</h4>
          <ul className="space-y-1 text-sm text-blue-800">
            <li>✅ ชนะ: +1 คะแนน</li>
            <li>❌ แพ้: -1 คะแนน</li>
            <li>🤝 เสมอ: ไม่มีการเปลี่ยนแปลงคะแนน</li>
            <li>🎁 ชนะ 3 ครั้งติดต่อกัน: +1 คะแนนพิเศษ (แล้วนับใหม่)</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
