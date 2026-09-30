"use client";

import { useEffect, useState } from "react";
import NoteItem from "./components/NoteItem";

// pixel matcha cup (drawn with squares)
function PixelCup({ className = "" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 16 16"
      shapeRendering="crispEdges"
      aria-hidden="true"
    >
     
      <rect x="5" y="1" width="1" height="2" fill="#f5ebc8" />
      <rect x="8" y="0" width="1" height="3" fill="#f5ebc8" />
      <rect x="11" y="1" width="1" height="2" fill="#f5ebc8" />
    

      <rect x="2" y="5" width="12" height="1" fill="#2f3a1f" />
      <rect x="2" y="6" width="1" height="7" fill="#2f3a1f" />
      <rect x="13" y="6" width="1" height="7" fill="#2f3a1f" />
      <rect x="3" y="13" width="10" height="1" fill="#2f3a1f" />
      
      <rect x="14" y="7" width="2" height="1" fill="#2f3a1f" />
      <rect x="15" y="8" width="1" height="3" fill="#2f3a1f" />
      <rect x="14" y="11" width="2" height="1" fill="#2f3a1f" />
     
      <rect x="3" y="6" width="10" height="7" fill="#f5ebc8" />
      
      <rect x="3" y="6" width="10" height="2" fill="#9ca764" />
      <rect x="7" y="6" width="2" height="1" fill="#c9d48f" />
      
      <rect x="4" y="9" width="1" height="3" fill="#ffffff" />
    


      <rect x="1" y="14" width="14" height="1" fill="#2f3a1f" />
      <rect x="2" y="15" width="12" height="1" fill="#838f58" />
    </svg>
  );
}

export default function Home() {
  const [notes, setNotes] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [exists, setExists] = useState(false);


  useEffect(() => {
    try {
      const saved = localStorage.getItem("notes");
      if (saved) setNotes(JSON.parse(saved));
    } catch {}
    setLoaded(true);
  }, []);

  
  useEffect(() => {
    if (loaded) localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes, loaded]);

  
  useEffect(() => {
    const t = title.trim().toLowerCase();
    setExists(
      t !== "" &&
        notes.some(
          (n) => n.title.trim().toLowerCase() === t && n.id !== editingId
        )
    );
  }, [title, notes, editingId]);

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setEditingId(null);
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim() || exists) return;

    if (editingId) {
      setNotes(
        notes.map((n) =>
          n.id === editingId
            ? { ...n, title: title.trim(), description: description.trim() }
            : n
        )
      );
    } else {
      const newNote = {
        id: Date.now(),
        title: title.trim(),
        description: description.trim(),
        date: new Date().toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
      };
      setNotes([newNote, ...notes]);
    }
    resetForm();
  };

  
  const handleEdit = (note) => {
    setEditingId(note.id);
    setTitle(note.title);
    setDescription(note.description);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  
  const handleDelete = (id) => {
    if (!window.confirm("Delete this note?")) return;
    setNotes(notes.filter((n) => n.id !== id));
    if (editingId === id) resetForm();
  };

  return (
    <main className="app">
      <header className="hero">
        <PixelCup className="hero-cup" />
        <p className="hero-tag">&gt; PLAYER 1 READY</p>
        <h1 className="hero-title">
          MATCHA
          <br />
          <em>NOTES</em>
        </h1>
        <p className="hero-sub">Write it down. Level up your day.</p>
      </header>

      
      <form className="form" onSubmit={handleSubmit}>
        <span className="form-badge">{editingId ? "EDIT MODE" : "NEW QUEST"}</span>
        <h2 className="form-label">
          {editingId ? "UPDATE NOTE" : "ADD NOTE"}
        </h2>

        <label>
          TITLE
          <input
            type="text"
            placeholder="Note title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            maxLength={40}
          />
        </label>
        {exists && (
          <p className="warn">! A note with this title already exists.</p>
        )}

        <label>
          DESCRIPTION
          <textarea
            rows={4}
            placeholder="Write your note here..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>

        <div className="form-btns">
          <button
            type="submit"
            className="btn-main"
            disabled={!title.trim() || !description.trim() || exists}
          >
            {editingId ? "SAVE" : "+ ADD"}
          </button>
          {editingId && (
            <button type="button" className="btn-cancel" onClick={resetForm}>
              CANCEL
            </button>
          )}
        </div>
      </form>

      <section className="list">
        <h2 className="list-title">
          ALL NOTES <span>{notes.length}</span>
        </h2>

        {notes.length === 0 ? (
          <div className="empty">
            <PixelCup className="empty-cup" />
            <p>NO NOTES YET. ADD YOUR FIRST ONE!</p>
          </div>
        ) : (
          <div className="grid">
            {notes.map((note, i) => (
              <NoteItem
                key={note.id}
                note={note}
                index={i}
                isEditing={editingId === note.id}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}