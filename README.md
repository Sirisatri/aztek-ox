# OX (Tic-tac-toe) Web Application

เกม OX (Tic-tac-toe) แบบ Web Application ที่มีระบบ OAuth 2.0 Authentication และการเก็บคะแนนผ่าน Supabase

## ✨ คุณสมบัติหลัก

### 🔐 การเข้าสู่ระบบ
- ✅ OAuth 2.0 ผ่าน NextAuth.js
- ✅ รองรับ Google OAuth
- ✅ ผู้เล่นต้องเข้าสู่ระบบก่อนเล่นเกม

### 🎮 การเล่นเกม
- ✅ ผู้เล่น (X) vs บอท (O)
- ✅ บอทใช้ Minimax Algorithm พร้อม Alpha-Beta Pruning
- ✅ กติกาเหมือน Tic-tac-toe ทั่วไป

### 📊 ระบบคะแนน
- **ชนะ**: +1 คะแนน
- **แพ้**: -1 คะแนน
- **เสมอ**: ไม่มีการเปลี่ยนแปลงคะแนน
- **โบนัส**: ชนะ 3 ครั้งติดต่อกัน = +1 คะแนนพิเศษ (แล้วนับใหม่)

### 🏆 กระดานคะแนน
- ✅ แสดงคะแนนผู้เล่นทั้งหมด
- ✅ เรียงตามคะแนนสูงสุด
- ✅ แสดงสถิติ: ชนะ, แพ้, เสมอ, อัตราชนะ

## 🛠️ เทคโนโลยีที่ใช้

- **Frontend**: Next.js 16, React 19, TypeScript
- **Styling**: Tailwind CSS 4
- **Authentication**: NextAuth.js v5 (OAuth 2.0)
- **Database**: Supabase (PostgreSQL)
- **Icons**: React Icons

## 🚀 การติดตั้ง

### 1. ติดตั้ง Dependencies

```bash
npm install
```

### 2. ตั้งค่า Environment Variables

สร้างไฟล์ `.env.local` และเพิ่มค่าต่อไปนี้:

```env
# NextAuth Configuration
AUTH_SECRET=your-auth-secret-here
AUTH_GOOGLE_ID=your-google-client-id
AUTH_GOOGLE_SECRET=your-google-client-secret

# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

#### การสร้าง AUTH_SECRET:
```bash
npx auth secret
```

1. ไปที่ [Google Cloud Console](https://console.cloud.google.com/)
2. สร้างโปรเจคใหม่หรือเลือกโปรเจคที่มีอยู่
3. เปิดใช้งาน Google+ API
4. ไปที่ **APIs & Services > Credentials**
5. สร้าง **OAuth 2.0 Client ID**
6. เพิ่ม Authorized redirect URIs:
   - `http://localhost:3000/api/auth/callback/google`
7. คัดลอก Client ID และ Client Secret

#### การตั้งค่า Supabase:

1. สร้างโปรเจคใหม่ที่ [Supabase](https://supabase.com)
2. คัดลอก Project URL และ Anon Key จาก **Settings > API**
3. ไปที่ **SQL Editor** และรันคำสั่ง SQL จากไฟล์ `supabase-schema.sql`

```sql
-- คัดลอกและรันทั้งหมดจากไฟล์ supabase-schema.sql
```

### 3. รันโปรเจค

```bash
npm run dev
```

เปิด [http://localhost:3000](http://localhost:3000) ในเบราว์เซอร์

## 📁 โครงสร้างโปรเจค

```
aztek/
├── src/
│   ├── app/
│   │   ├── api/auth/[...nextauth]/  # NextAuth API routes
│   │   ├── components/
│   │   │   ├── TicTacToeGame.tsx    # คอมโพเนนต์เกม
│   │   │   ├── UserProfile.tsx      # แสดงข้อมูลผู้ใช้
│   │   │   └── SignOutButton.tsx    # ปุ่มออกจากระบบ
│   │   ├── dashboard/
│   │   │   └── page.tsx             # หน้าเล่นเกม
│   │   ├── leaderboard/
│   │   │   └── page.tsx             # หน้ากระดานคะแนน
│   │   └── login/
│   │       └── page.tsx             # หน้าเข้าสู่ระบบ
│   ├── lib/
│   │   ├── supabase.ts              # Supabase client และ types
│   │   └── gameLogic.ts             # ตรรกะเกมและ AI
│   └── auth.ts                       # NextAuth configuration
├── supabase-schema.sql               # Database schema
├── middleware.ts                     # Route protection
└── package.json
```

## 🎮 การใช้งาน

1. **เข้าสู่ระบบ**: คลิก "Sign in with Google" ที่หน้า Login
2. **เล่นเกม**: คลิกที่ช่องว่างเพื่อวาง X (คุณเป็น X, บอทเป็น O)
3. **ดูคะแนน**: ดูสถิติและคะแนนของคุณด้านบน
4. **กระดานคะแนน**: คลิกปุ่ม "🏆 กระดานคะแนน" เพื่อดูอันดับผู้เล่นทั้งหมด

## 💾 Database Schema

### Table: user_scores
| Column        | Type      | Description                |
|---------------|-----------|----------------------------|
| id            | BIGINT    | Primary Key                |
| user_id       | TEXT      | User identifier (unique)   |
| user_email    | TEXT      | User email                 |
| user_name     | TEXT      | User display name          |
| score         | INTEGER   | Total score                |
| win_streak    | INTEGER   | Current win streak         |
| total_wins    | INTEGER   | Total wins                 |
| total_losses  | INTEGER   | Total losses               |
| total_draws   | INTEGER   | Total draws                |
| created_at    | TIMESTAMP | Created timestamp          |
| updated_at    | TIMESTAMP | Updated timestamp          |

### Table: game_history
| Column           | Type      | Description                      |
|------------------|-----------|----------------------------------|
| id               | BIGINT    | Primary Key                      |
| user_id          | TEXT      | User identifier                  |
| result           | TEXT      | 'win', 'loss', or 'draw'         |
| score_change     | INTEGER   | Points gained/lost               |
| win_streak_after | INTEGER   | Win streak after this game       |
| bonus_earned     | BOOLEAN   | Whether bonus was earned         |
| created_at       | TIMESTAMP | Game timestamp                   |

## 🤖 อัลกอริทึม AI

บอทใช้ **Minimax Algorithm** พร้อม **Alpha-Beta Pruning**:
- มองหาการเคลื่อนไหวที่ดีที่สุดได้
- เล่นอย่างสมบูรณ์แบบ (ไม่มีทางชนะได้ถ้าบอทเริ่มก่อน)
- มีประสิทธิภาพสูงด้วย Alpha-Beta Pruning

## 🔐 การเพิ่ม OAuth Provider อื่นๆ

แก้ไขไฟล์ `src/auth.ts`:

```typescript
import GitHub from 'next-auth/providers/github';

providers: [
  Google({ ... }),
  GitHub({
    clientId: process.env.AUTH_GITHUB_ID,
    clientSecret: process.env.AUTH_GITHUB_SECRET,
  }),
]
```

## 📚 เอกสารเพิ่มเติม

- [NextAuth.js Documentation](https://next-auth.js.org/)
- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [OAuth 2.0 Specification](https://oauth.net/2/)

## 📝 License

MIT

---

พัฒนาด้วย ❤️ โดยใช้ Next.js, Supabase และ NextAuth.js


---

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
