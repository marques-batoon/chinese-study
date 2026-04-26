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
  const [selectedIds, setSelectedIds] = useState([]);

  const isStrokes = mode === "strokes";

  function toggleSelect(id) {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  }

  function deselectAll() {
    setSelectedIds([]);
    setSelectedSection(null);
  }

  const sectionEntries =
    selectedSection?.id === "selected"
      ? entries.filter((e) => selectedIds.includes(e.id))
      : selectedSection
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

      <StudyCard
        entries={visibleEntries}
        mode={mode}
        selectedIds={selectedIds}
        onToggleSelect={toggleSelect}
      />

      {!isStrokes && (
        <div className="section-selector">
          <div className="section-controls">
            <button
              className={`section-toggle-btn ${selectedSection ? "active" : ""}`}
              onClick={() => setShowSectionPicker(!showSectionPicker)}
            >
              {selectedSection ? `Section: ${selectedSection.label}` : "Choose Section"}
            </button>
            {selectedSection?.id === "selected" && (
              <button className="deselect-all-btn" onClick={deselectAll}>
                Deselect All
              </button>
            )}
          </div>

          {showSectionPicker && (
            <div className="section-list">
              <button
                className={`section-btn ${!selectedSection ? "active" : ""}`}
                onClick={() => { setSelectedSection(null); setShowSectionPicker(false); }}
              >
                All
              </button>
              <button
                className={`section-btn ${selectedSection?.id === "selected" ? "active" : ""}`}
                onClick={() => { setSelectedSection({ id: "selected", label: "Selected" }); setShowSectionPicker(false); }}
              >
                {`Selected${selectedIds.length > 0 ? ` (${selectedIds.length})` : ""}`}
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
