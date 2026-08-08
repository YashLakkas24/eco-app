# 🌍 EcoLife+

### Small Actions. Massive Impact.

EcoLife+ is an AI-powered sustainability platform that transforms everyday environmental actions into measurable, visual, and rewarding impact.

Instead of simply telling users to "save the planet", EcoLife+ makes sustainability interactive. Users can complete eco-friendly challenges, track their environmental impact, calculate their carbon footprint, receive AI-powered recommendations, monitor sustainable transportation, interact with a digital Earth, earn Green Points, unlock achievements, compete on leaderboards, and share their progress with the community.

> 🌱 **Turn everyday choices into real environmental impact.**

---

## 📌 Table of Contents

- [About the Project](#about-the-project)
- [Problem Statement](#problem-statement)
- [Our Solution](#our-solution)
- [Key Features](#key-features)
- [How It Works](#how-it-works)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [API Reference](#api-reference)
- [Future Scope](#future-scope)
- [Team](#team)
- [License](#license)

---

## 🌱 About the Project

Climate change and environmental degradation are not only large-scale problems. They are also the result of millions of small everyday decisions. Whether it is choosing a car instead of walking, wasting water, or using unnecessary plastic, individual actions collectively contribute to environmental impact.

The problem is that sustainability platforms often present this information as plain statistics. EcoLife+ takes a different approach by creating an interactive experience where your actions visibly heal a digital planet.

---

## ❗ Problem Statement

The current sustainability experience has several problems:
1. **Lack of Engagement:** Many environmental applications provide information but fail to keep users engaged over time.
2. **Lack of Personalization:** Generic sustainability advice may not be relevant to an individual's lifestyle.
3. **Invisible Impact:** Users often cannot visually understand how their individual actions contribute to environmental improvement.
4. **Lack of Motivation:** Without rewards, progress tracking, or social interaction, users may lose motivation.
5. **Fragmented Tools:** Carbon calculators, recycling information, and sustainability tracking are often spread across separate platforms.

---

## 💡 Our Solution

EcoLife+ combines sustainability, artificial intelligence, gamification, data visualization, and community interaction into one ecosystem. 

The platform allows users to:
🌍 Visualize planetary health  
♻️ Track sustainable actions  
🌱 Complete eco challenges  
🚲 Track green transportation  
🧮 Calculate carbon footprint  
🤖 Receive AI-powered recommendations  
🏆 Earn Green Points & unlock achievements  
👥 Participate in a sustainability community  

---

## 🚀 Key Features

### 🌍 1. Interactive 3D Earth
The centerpiece of EcoLife+ is an interactive digital Earth representing the environmental state of the user's ecosystem. It includes 3D rendering, atmospheric effects, lighting, and a dynamic Planet Health visualization that responds to your eco-actions.

### 🧠 2. Planet Health Engine
A backend engine that tracks the overall health of the digital planet. When you log a positive environmental action, the engine updates the planet's state, triggering visual healing effects on the 3D Earth.

### 🎯 3. Eco Challenges & Gamification
Actionable sustainability challenges (e.g., plant a tree, save water, recycle) that reward users with Green Points, level-ups, and leaderboard rankings.

### 🧮 4. Carbon Calculator & Green Miles
Evaluate the impact of your lifestyle choices and track sustainable transportation (walking, cycling). The system converts these activities into measurable environmental impact.

### ♻️ 5. Smart Recycling Guide & AQI Checker
A guide to help users properly dispose of waste, paired with an Air Quality Index checker to understand local environmental conditions.

### 🤖 6. AI Eco Advisor
Powered by Google's Gemini AI, this feature provides personalized sustainability recommendations based on your specific lifestyle inputs rather than generic tips.

### ✨ 7. Eco Wrapped
A personalized summary of your sustainability journey—your year of environmental impact visualized.

---

## 🔄 How It Works

| Step | What Happens |
|------|--------------|
| 🌱 1 | **User performs a sustainable action** (e.g., tracking a bike ride). |
| ⚡ 2 | **Impact is calculated** in the backend using the Green Score Engine. |
| 🏆 3 | **User earns Green Points** and unlocks achievements. |
| 🌍 4 | **Planet Health score increases** based on the collective actions. |
| 🌎 5 | **Digital Earth responds visually**, showing a cleaner, greener planet. |
| 📊 6 | **User sees their impact** on their personalized dashboard. |

---

## 🛠️ Technology Stack

**Frontend:**
- React (Vite)
- TypeScript / JavaScript
- Tailwind CSS
- Framer Motion
- Three.js & React Three Fiber (3D Earth)

**Backend & AI:**
- Node.js & Express
- Google Gemini API (AI Eco Advisor)

**State Management:**
- Zustand / Context API

---

## 📁 Project Structure

```
ecolife+/
├── public/
│   └── earth.glb
├── src/
│   ├── components/      # UI Components (Hero, Dashboards, Leaderboards)
│   ├── earth/           # Three.js & React Three Fiber components
│   ├── engine/          # Planet Health & Green Score logic
│   ├── context/         # Auth & State Contexts
│   ├── hooks/           # Custom React Hooks
│   ├── App.jsx
│   └── main.jsx
├── server.ts            # Express server configuration
├── .env.example
└── package.json
```
## 🚀 Future Scope

- **Advanced Earth Simulation:** Regional environmental health, live weather integration, and real-world carbon datasets.
- **Mobile Application:** Expanding to iOS/Android with background walk tracking and location-based challenges.
- **Hardware Integration:** Pulling real-time data from IoT environmental sensors & wearable devices.
- **Enterprise/College Leagues:** Team-based sustainability challenges for larger organizations.

---

## 👨‍💻 Team

**Krashh Coders**  
Built with ❤️ for PixxelHack 2.0.

---

## 📄 License

This project was developed as a hackathon project. 

> **EcoLife+**  
> *Small Actions. Massive Impact. Heal the planet, one action at a time.* 🌱🌍
