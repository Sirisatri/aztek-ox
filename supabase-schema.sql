-- Create user_scores table
CREATE TABLE IF NOT EXISTS user_scores (
  id BIGSERIAL PRIMARY KEY,
  user_id TEXT NOT NULL UNIQUE,
  user_email TEXT NOT NULL,
  user_name TEXT NOT NULL,
  score INTEGER DEFAULT 0,
  win_streak INTEGER DEFAULT 0,
  total_wins INTEGER DEFAULT 0,
  total_losses INTEGER DEFAULT 0,
  total_draws INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create game_history table
CREATE TABLE IF NOT EXISTS game_history (
  id BIGSERIAL PRIMARY KEY,
  user_id TEXT NOT NULL,
  result TEXT NOT NULL CHECK (result IN ('win', 'loss', 'draw')),
  score_change INTEGER NOT NULL,
  win_streak_after INTEGER NOT NULL,
  bonus_earned BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes
CREATE INDEX idx_user_scores_user_id ON user_scores(user_id);
CREATE INDEX idx_user_scores_score ON user_scores(score DESC);
CREATE INDEX idx_game_history_user_id ON game_history(user_id);
CREATE INDEX idx_game_history_created_at ON game_history(created_at DESC);

-- Enable Row Level Security
ALTER TABLE user_scores ENABLE ROW LEVEL SECURITY;
ALTER TABLE game_history ENABLE ROW LEVEL SECURITY;

-- Create policies (allow all for simplicity - adjust based on your needs)
CREATE POLICY "Allow all operations on user_scores" ON user_scores FOR ALL USING (true);
CREATE POLICY "Allow all operations on game_history" ON game_history FOR ALL USING (true);
