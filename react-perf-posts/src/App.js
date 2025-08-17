// (1) Import React bits we need
import React, { useEffect, useState, useCallback } from "react";
// (2) Import the memoized Post component and styles
import Post from "./components/Post";
import "./styles.css";

export default function App() {
  // (3) Timer state that updates every second
  const [time, setTime] = useState(0);

  // (4) Controlled inputs for new post
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  // (5) Posts state: each post = { id, title, body, verifyPost }
  const [posts, setPosts] = useState([]);

  // (6) Start a 1s interval; clean it up on unmount
  useEffect(() => {
    const id = setInterval(() => setTime((t) => t + 1), 1000);
    return () => clearInterval(id);
  }, []);

  // (7) Add a new post (simple unique id using Date.now + random)
  const addPost = () => {
    if (!title.trim() || !body.trim()) return;
    setPosts((prev) => [
      ...prev,
      {
        id: `${Date.now()}-${Math.floor(Math.random() * 1e6)}`,
        title: title.trim(),
        body: body.trim(),
        verifyPost: false,
      },
    ]);
    setTitle("");
    setBody("");
  };

  // (8) Toggle verifyPost by id — wrapped in useCallback so
  //     the function identity is stable between renders.
  const toggleVerify = useCallback((id) => {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, verifyPost: !p.verifyPost } : p
      )
    );
  }, []);

  // (9) Render — notice we pass the SAME toggleVerify function to each Post
  //     and also pass the id separately. This avoids creating new inline functions.
  return (
    <div className="app">
      <h1>Posts</h1>

      <div className="toolbar">
        <div className="timer">Time: {time}s</div>

        <input
          className="input"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          className="input"
          placeholder="Body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
        <button className="btn" onClick={addPost}>
          Add Post
        </button>
      </div>

      <div className="list">
        {posts.map((p) => (
          <Post
            key={p.id}
            id={p.id}
            title={p.title}
            body={p.body}
            verifyPost={p.verifyPost}
            onToggleVerify={toggleVerify}
          />
        ))}
      </div>
    </div>
  );
}
