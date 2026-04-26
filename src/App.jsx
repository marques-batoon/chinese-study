import { useState } from "react";
import StudyCard from "./components/StudyCard";
import { defaultEntries } from "./data/defaultData";
import { strokeEntries } from "./data/strokeData";
import { sections } from "./data/sections";
import "./App.css";

function stripTones(str) {
  return str.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
}

export default function App() {
  const [entries] = useState(defaultEntries);
  const [mode, setMode] = useState("characters");
  const [query, setQuery] = useState("");
  const [selectedSection, setSelectedSection] = useState(null);
  const [showSectionPicker, setShowSectionPicker] = useState(false);

  const isStrokes = mode === "strokes";

  const sectionEntries = selectedSection
    ? entries.filter((e) => selectedSection.entryIds.includes(e.id))
    : entries;

  const q = stripTones(query.trim());

  const filteredEntries = q
    ? sectionEntries.filter(
        (e) =>
          e.character.includes(query.trim()) ||
          stripTones(e.pinyin).includes(q) ||
          e.english.toLowerCase().includes(q)
      )
    : sectionEntries;

  const filteredStrokes = q
    ? strokeEntries.filter(
        (e) =>
          e.character.includes(query.trim()) ||
          stripTones(e.pinyin).includes(q) ||
          e.english.toLowerCase().includes(q)
      )
    : strokeEntries;

  const visibleEntries = isStrokes ? filteredStrokes : filteredEntries;
  const activeTotal = isStrokes ? strokeEntries.length : sectionEntries.length;
  const activeFiltered = isStrokes ? filteredStrokes.length : filteredEntries.length;

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
          词汇(cíhuì)
        </button>
        <button
          className={`mode-btn ${mode === "strokes" ? "active" : ""}`}
          onClick={() => setMode("strokes")}
        >
          笔画 (bǐhuà)
        </button>
      </div>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search characters, pinyin, or english..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        {query && (
          <span className="search-count">
            {activeFiltered} / {activeTotal}
          </span>
        )}
      </div>

      <StudyCard entries={visibleEntries} mode={mode} />

      {!isStrokes && sections.length > 0 && (
        <div className="section-selector">
          <button
            className={`section-toggle-btn ${selectedSection ? "active" : ""}`}
            onClick={() => setShowSectionPicker(!showSectionPicker)}
          >
            {selectedSection ? `Section: ${selectedSection.label}` : "Choose Section"}
          </button>

          {showSectionPicker && (
            <div className="section-list">
              <button
                className={`section-btn ${!selectedSection ? "active" : ""}`}
                onClick={() => { setSelectedSection(null); setShowSectionPicker(false); }}
              >
                All
              </button>
              {sections.map((s) => (
                <button
                  key={s.id}
                  className={`section-btn ${selectedSection?.id === s.id ? "active" : ""}`}
                  onClick={() => { setSelectedSection(s); setShowSectionPicker(false); }}
                >
                  {s.label}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
