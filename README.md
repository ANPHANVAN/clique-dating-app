# Clique Dating App

**🚀 Live Demo:** [https://clique-dating-app.vercel.app](https://clique-dating-app.vercel.app)

## 📖 Overview

A lightweight, frontend-first dating application built with Next.js 16 and React 19. This project serves as a technical demonstration of modern React patterns, client-side state management, and business logic implementation for a matching and automated scheduling system. 

It implements a complete matching lifecycle—from user discovery, to sending likes, mutual matching, and ultimately finding overlapping schedules to coordinate a date—all handled seamlessly on the client side.

## ✨ Key Features

- **User Discovery & Interactions**: Browse through other user profiles and send "Likes".
- **Mutual Matching Pattern**: A `Match` is automatically instantiated when two users mutually "Like" each other.
- **Smart Scheduling (Overlap Detection)**: Matched users can input their free time slots (date, start hour, end hour). Uniquely, the system computes the intersection of their availabilities to automatically schedule a "Date" event (e.g., meeting at a coffee shop).
- **Mock Backend & Persistence**: Utilizes the React Context API combined with DOM `localStorage` to simulate a persistent database layer, operating entirely without a live server while keeping data persistent across page reloads.

## 🛠 Tech Stack

- **Framework**: Next.js 16.1 (App Router)
- **Core Library**: React 19
- **Language**: TypeScript (Strict typing for robust entities)
- **Styling**: Tailwind CSS v4
- **UI Components**: Radix UI / shadcn/ui
- **State Management**: React Context API + LocalStorage
- **Notifications**: Sonner & React Hot Toast

## 🧠 System Architecture & Organization

### 1. File & Folder Structure
Dating App follows a feature-driven and strictly typed architecture to ensure separation of concerns:
```text
src/
├── app/             # Next.js App Router UI (Pages & Routing)
│   ├── (auth)/      # Login/Register flows
│   └── matches/     # Match management and scheduling views
├── components/      # Reusable UI components (Forms, Cards, Shadcn primitives)
├── context/         # React Context API for global state management
├── lib/             # Pure business logic and helper functions
└── types/           # Core TypeScript models (User, Match, Dating)
```

### 2. Data Persistence (Mock Backend)
Since this is a frontend-centric demonstration, data is persisted using **DOM `localStorage`** combined with the React Context API (`src/context/AppContext.tsx`).
- **Mechanism**: The `AppContext` initializes by hydrating state from `localStorage`. A predefined mock state is seeded if the storage is empty.
- **Synchronization**: Every state mutation triggers a `useEffect` hook that serializes the entire `AppModel` to JSON and writes it back to `localStorage`. This ensures data survives page reloads and simulates a real persistent database layer without needing a live backend.

### 3. Mutual Matching Logic
The application handles the matching lifecycle progressively:
1. **User Discovery & Interaction**: Users browse profiles and trigger the "Like" action.
2. **State Evaluation**: The system checks if a reverse Like already exists (i.e., User B already liked User A).
3. **Match Instantiation**: If a mutual Like is detected, a `Match` entity is instantly generated and stored in the global state, linking both users via their UUIDs.

### 4. Smart Scheduling (Overlap Detection) Logic
Once two users are matched, they can submit their available free time slots. The system uses a mathematical overlap algorithm (`src/lib/match.ts`) to auto-schedule a "Date":
- It loops through the `availabilities` arrays of User A and User B.
- It filters for identical `date` strings.
- It calculates the intersection of their time slots: 
  - `start = Math.max(A.start, B.start)`
  - `end = Math.min(A.end, B.end)`
- If `start < end`, a valid continuous block of overlapping time exists. A `Dating` event is automatically generated, locking in the meeting time.

## 🔮 Future Improvements & Proposals

### If given more time, I would improve:
- **Migration to a Real Backend**: Switch from `localStorage` to a Node.js/Express API with PostgreSQL (using Prisma). Since the current architecture separates pure logic (`src/lib`) from UI components, this migration would be seamlessly focused on the data fetching layer (e.g., using Tanstack Query).
- **Authentication System**: Implement actual JWT-based authentication via NextAuth.js instead of mocking the login state.
- **Unit Testing**: Add Jest/Vitest to thoroughly test the pure overlap algorithms in `src/lib/match.ts` to prevent edge-case regressions.

### Recommended Features for the Product:
1. **Real-time Chat via WebSockets (Socket.io)**
   - *Reason*: Matches need a way to communicate before their scheduled date to build rapport and confirm details.
2. **Push Notifications (PWA or Firebase)**
   - *Reason*: Users should be instantly notified when they get a new mutual match, or when a date is successfully scheduled, increasing app engagement and retention.
3. **Advanced Filtering & Preferences**
   - *Reason*: As the user base grows, allowing users to filter by distance, age ranges, and specific interests will vastly improve the quality of their matches and overall user experience.

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- Use `npm`, `yarn`, `pnpm`, or `bun`

### Installation
1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.