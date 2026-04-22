import { useState } from "react";

export default function AddEntry({ onAdd, onDelete, entries }) {
  const [character, setCharacter] = useState("");
  const [pinyin, setPinyin] = useState("");
  const [english, setEnglish] = useState("");
  const [error, setError] = useState("");
  const [showList, setShowList] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    if (!character.trim() || !pinyin.trim() || !english.trim()) {
      setError("All fields required.");
      return;
    }
    onAdd({ character: character.trim(), pinyin: pinyin.trim(), english: english.trim() });
    setCharacter("");
    setPinyin("");
    setEnglish("");
    setError("");
  }

  return (
    <div className="add-section">
      <h2>Add New Entry</h2>
      <form className="add-form" onSubmit={handleSubmit}>
        <input
          placeholder="Character(s) e.g. 你好"
          value={character}
          onChange={(e) => setCharacter(e.target.value)}
        />
        <input
          placeholder="Pinyin e.g. nǐ hǎo"
          value={pinyin}
          onChange={(e) => setPinyin(e.target.value)}
        />
        <input
          placeholder="English e.g. hello"
          value={english}
          onChange={(e) => setEnglish(e.target.value)}
        />
        {error && <span className="error">{error}</span>}
        <button type="submit" className="add-btn">Add Entry</button>
      </form>

      <button
        className="toggle-list-btn"
        onClick={() => setShowList(!showList)}
      >
        {showList ? "Hide" : "Manage"} Entries ({entries.length})
      </button>

      {showList && (
        <div className="entry-list">
          {entries.length === 0 && <p className="empty">No entries.</p>}
          {entries.map((entry) => (
            <div key={entry.id} className="entry-row">
              <span className="entry-char">{entry.character}</span>
              <span className="entry-pinyin">{entry.pinyin}</span>
              <span className="entry-english">{entry.english}</span>
              <button
                className="delete-btn"
                onClick={() => onDelete(entry.id)}
                title="Delete"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
