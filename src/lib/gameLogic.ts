export type Player = 'X' | 'O' | null;
export type Board = Player[];

export const WINNING_COMBINATIONS = [
  [0, 1, 2], // Top row
  [3, 4, 5], // Middle row
  [6, 7, 8], // Bottom row
  [0, 3, 6], // Left column
  [1, 4, 7], // Middle column
  [2, 5, 8], // Right column
  [0, 4, 8], // Diagonal
  [2, 4, 6], // Anti-diagonal
];

export function checkWinner(board: Board): Player {
  for (const combo of WINNING_COMBINATIONS) {
    const [a, b, c] = combo;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
  return null;
}

export function isBoardFull(board: Board): boolean {
  return board.every((cell) => cell !== null);
}

export function getAvailableMoves(board: Board): number[] {
  return board.map((cell, index) => (cell === null ? index : -1)).filter((i) => i !== -1);
}

// Minimax algorithm for bot AI
export function minimax(
  board: Board,
  depth: number,
  isMaximizing: boolean,
  alpha: number = -Infinity,
  beta: number = Infinity
): number {
  const winner = checkWinner(board);

  // Terminal states
  if (winner === 'O') return 10 - depth; // Bot wins
  if (winner === 'X') return depth - 10; // Player wins
  if (isBoardFull(board)) return 0; // Draw

  if (isMaximizing) {
    let maxScore = -Infinity;
    for (let i = 0; i < 9; i++) {
      if (board[i] === null) {
        board[i] = 'O';
        const score = minimax(board, depth + 1, false, alpha, beta);
        board[i] = null;
        maxScore = Math.max(maxScore, score);
        alpha = Math.max(alpha, score);
        if (beta <= alpha) break; // Alpha-beta pruning
      }
    }
    return maxScore;
  } else {
    let minScore = Infinity;
    for (let i = 0; i < 9; i++) {
      if (board[i] === null) {
        board[i] = 'X';
        const score = minimax(board, depth + 1, true, alpha, beta);
        board[i] = null;
        minScore = Math.min(minScore, score);
        beta = Math.min(beta, score);
        if (beta <= alpha) break; // Alpha-beta pruning
      }
    }
    return minScore;
  }
}

export function getBotMove(board: Board): number {
  let bestScore = -Infinity;
  let bestMove = -1;

  for (let i = 0; i < 9; i++) {
    if (board[i] === null) {
      board[i] = 'O';
      const score = minimax(board, 0, false);
      board[i] = null;

      if (score > bestScore) {
        bestScore = score;
        bestMove = i;
      }
    }
  }

  return bestMove;
}
