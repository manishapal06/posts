Overview

This project demonstrates optimizing a React application’s performance using:

React.memo

useMemo

useCallback

By applying these memoization techniques, we prevent unnecessary re-renders, reduce wasted computation, and improve responsiveness.

📂 Project Setup
1. Create React App
npx create-react-app react-perf-posts
cd react-perf-posts

2. File Structure
src/
 ├─ components/
 │   └─ Post.jsx
 ├─ App.jsx
 ├─ index.js
 └─ styles.css

3. Run the Project
npm start

📝 Features
🔹 1. Timer in App Component

A timer increments every 1 second using useEffect + setInterval.

Runs independently without forcing re-renders of all posts.

🔹 2. Add Post Functionality

Two inputs (title, body) to accept post details.

A button Add Post inserts a new post into the list.

Each post includes:

id → unique identifier

title → post title

body → post body

verifyPost → boolean (default: false)

🔹 3. Post Component

Displays title, body, and Verify button.

Clicking the button toggles between “Verify” and “Verified”.

Each post is assigned a random background color using useMemo.

🔹 4. Performance Optimizations

✅ React.memo(Post) → prevents unnecessary re-renders of Post components.

✅ useMemo → memoizes random background color so it doesn’t change on each render.

✅ useCallback(toggleVerify) → memoizes event handler to keep reference stable.

📊 Before vs After Optimization
❌ Before

Every second, when the timer updated, all posts re-rendered.

Random background colors kept changing.

Performance degraded as the number of posts grew.

✅ After

Timer updates only the timer, posts remain untouched.

Background colors remain stable thanks to useMemo.

Posts only re-render when their own props change.

🖼️ Screenshots
Before Optimization

All posts flickered / re-rendered when timer changed.

After Optimization

Timer updates smoothly.

Posts stay stable with fixed colors.

Only updated post re-renders on Verify click.

⚡ Tech Stack

React

React Hooks (useState, useEffect, useCallback, useMemo)

CSS

📚 Learnings

How to apply memoization in React.

Difference between React.memo, useMemo, and useCallback.

Preventing unnecessary re-renders for better performance.
