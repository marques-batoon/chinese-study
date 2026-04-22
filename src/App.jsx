import { useState } from "react";
import StudyCard from "./components/StudyCard";
import { defaultEntries } from "./data/defaultData";
import "./App.css";

export default function App() {
  const [entries] = useState(defaultEntries);
  const [mode, setMode] = useState("characters");

  return (
    <div className="app">
      <header className="header">
        <h1>Marques' 中文 Study App</h1>
      </header>

      <div className="mode-selector">
        <button
          className={`mode-btn ${mode === "characters" ? "active" : ""}`}
          onClick={() => setMode("characters")}
        >
          字
        </button>
        <button
          className={`mode-btn ${mode === "vocabulary" ? "active" : ""}`}
          onClick={() => setMode("vocabulary")}
        >
          词汇
        </button>
      </div>

      <StudyCard entries={entries} mode={mode} />
    </div>
  );
}
