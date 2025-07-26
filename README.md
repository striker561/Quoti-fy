# 🎨 Quoti-fy — Emotion-Based Quote & Image Generator

**Quoti-fy** is a dynamic and emotionally intelligent web app that lets users generate visually stunning, mood-aligned quotes. By adjusting their **emotion**, **intensity**, and **style**, users can create personalized quote visuals that resonate deeply.

---

## ✨ Features

- 🎭 **Emotion Input**: One-word custom entry or select from curated mood presets.
- 🎚️ **Intensity Control**: Vibe slider (0–100) with expressive emoji feedback.
- 🖼️ **Background Styles**: Landscape, Buildings, Sci-Fi, Gradient, Random.
- 🎨 **Filters**: Original, Nostalgic, Old, Pop with visual effects pipeline (planned).
- 🧠 **Smart Quote Generator**: Based on mood, time of day, location, and user context.
- 📸 **Image Output**: Quote rendered onto personalized image canvas for download/sharing.
- 🌐 **Web Share API** + Clipboard integration for seamless mobile/desktop sharing.
- 🧾 **Usage Quotas** per user (tracked via Redis; only after login).
- 🔒 **Authentication** with Google & GitHub via NextAuth.

---

## 🛠️ Tech Stack

| Layer                      | Tech                                       |
| -------------------------- | ------------------------------------------ |
| Frontend                   | Next.js 14 (App Router) + TypeScript       |
| Styling                    | TailwindCSS (with dark mode + shadcn/ui)   |
| State                      | React Hooks (`useState`, `useEffect`)      |
| Forms/Validation (Planned) | Zod (`v3`) for schema validatio            |
| Auth                       | NextAuth (Google & GitHub)                 |
| Storage (Planned)          | Cloud storage bucket (for rendered images) |
| Rate-Limiting              | Redis (for authenticated users)            |
| Runtime                    | ⚡️ [Bun](https://bun.sh/)                  |

---

## 🚀 Getting Started

### Prerequisites

- Bun (recommended) or Node.js ≥ 18
- Redis instance (local or cloud)
- Optional: `.env` with credentials (Google, GitHub, Redis, etc.); see `.env-sample`

### Install & Run (Bun)

```bash
bun install
bun dev
````

> Visit `http://localhost:3000` in your browser.

---

## 🧪 Dev Notes

- Quote generation is **not cached** intentionally for personalization (mood + time + location).
    
- Image generation is handled client-side for now (canvas considered too heavy).
    
- Moving toward backend image rendering (Next.js API route with image pipeline).
    
- No background queue yet — expected to be community-driven or future phase.
    
- Plans to store rendered images + form data into a **cloud bucket**.
    

---

## 📋 TODO

    
-  🔃 Generate shareable image with text overlay - In Progress, Need Help 🥲
    
-  🎯 Image filter effects (paper-like, B/W, etc.) - Integrated
    
-  🧪 Zod input validation for image/quote endpoints
    
-  🗃️ Cloud storage for rendered images and Metadata - In Progress

---

## 🧠 Inspiration

Quoti-fy was born out of a desire to blend **mental wellness**, **mood tracking**, and **visual storytelling** one emotionally resonant quote at a time.

---

## 🤝 Contributing

Pull requests are welcome!  
If you're excited by expressive apps, image rendering, emotional design, or open-source learning, this project is for you.

1. Fork it
    
2. Create your branch (`git checkout -b feature-xyz`)
    
3. Commit your changes
    
4. Push and create a PR
    

---

## 📜 License

MIT  open-source and free to modify.

---

## 🔧 Notes

### 🤖 On the Use of AI

> **AI was used as a tool, not a crutch.**

This project leverages AI selectively and intentionally,  mainly to accelerate ideation, polish content, and assist with basic scaffolding. Every piece of code was **reviewed, customized, and modified** by hand to ensure it aligns with the project’s goals, performance standards, and architectural integrity.

There was no "vibe coding" her thoughtful engineering decisions were made, and any AI-assisted outputs were **strictly treated as drafts** or helpers, not final implementations.

The goal was to **learn, build, and iterate** and AI served as a productivity companion, not a substitute for real problem-solving.
