# 🎨 Quoti-fy — Emotion-Based Quote & Image Generator

Quoti-fy is a dynamic web application that allows users to generate visually striking, emotionally resonant quotes. By adjusting their current mood, vibe intensity, and background style, users can create a personalized visual quote experience that matches their emotional state.

## 🧠 Features

- 🎭 Emotion input (one-word or from presets)
- 🎚️ Adjustable vibe intensity slider with emoji feedback
- 🌄 Background styles: Landscape, Buildings, Sci-Fi, Gradient, Random
- 🎨 Filters: Original, Nostalgic, Old, Pop
- 🧠 Smart quote generator (based on emotion and intensity)
- 📸 Image-based output, suitable for download or sharing

---

## 📦 Tech Stack

- **Framework:** [Next.js](https://nextjs.org/)
- **Styling:** TailwindCSS
- **Image Handling:** Next.js `Image` + Static assets
- **State Management:** React Hooks (`useState`, `useEffect`)
- **Quote Generation:** Emotion-driven algorithm (AI-ready)
- **API Ready:** Optional integration with image/quote APIs (e.g., Unsplash, OpenAI, etc.)
- **README FILE**: AI generated 👁️ (Would Update as application grows)

---

## 🚀 Getting Started

### Prerequisites

- Node.js >= 18
- npm or yarn

### Installation

```bash
git clone https://github.com/striker561/Quoti-fy.git
cd Quoti-fy
npm install
# or
yarn
````

### Running the App Locally

```bash
npm run dev
# or
yarn dev
```

Visit `http://localhost:3000` in your browser.

---

## 🧪 Development Notes

- Mood slider starts at a preset default and animates from 0 to that value.
    
- Dynamic linear-gradient background reflects current vibe.
    
- Image style and filters influence quote background generation logic.
    
- Designed with mobile responsiveness and accessibility in mind.
    
- Time of the day as well as your location influence the quote and image generated.
    

---

## 🤝 Contributing

Pull requests are welcome! Feel free to fork the repo and submit PRs. For major changes, please open an issue first to discuss what you’d like to change.

---

## 💡 Inspiration

This app was inspired by the need for mental wellness through expressive visuals and thoughtful words, merging emotion with digital creativity.