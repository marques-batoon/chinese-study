import { useState, useEffect } from "react";

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function StudyCard({ entries, mode }) {
  const [deck, setDeck] = useState([...entries]);
  const [index, setIndex] = useState(0);
  const [showPinyin, setShowPinyin] = useState(false);
  const [showCharacter, setShowCharacter] = useState(false);
  const [showEnglish, setShowEnglish] = useState(false);
  const [shuffled, setShuffled] = useState(false);

  useEffect(() => {
    setDeck([...entries]);
    setIndex(0);
    resetReveals();
    setShuffled(false);
  }, [entries, mode]);

  function resetReveals() {
    setShowPinyin(false);
    setShowCharacter(false);
    setShowEnglish(false);
  }

  function goTo(i) {
    setIndex(i);
    resetReveals();
  }

  function prev() {
    goTo((index - 1 + deck.length) % deck.length);
  }

  function next() {
    goTo((index + 1) % deck.length);
  }

  useEffect(() => {
    function handleKey(e) {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
      if (e.key === "s" || e.key === "S") toggleShuffle();
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  });

  function toggleShuffle() {
    if (shuffled) {
      setDeck([...entries]);
      setShuffled(false);
    } else {
      setDeck(shuffle(entries));
      setShuffled(true);
    }
    setIndex(0);
    resetReveals();
  }

  if (deck.length === 0) {
    return (
      <div className="empty-state">
        <p>No entries yet. Add some below!</p>
      </div>
    );
  }

  const card = deck[index];

  return (
    <div className="study-area">
      <div className="progress">
        {index + 1} / {deck.length}
      </div>

      <div className="card">
        {mode === "characters" ? (
          <>
            <div className="main-display character-display">{card.character}</div>

            <div className="reveals">
              <button
                className={`reveal-btn ${showPinyin ? "revealed" : ""}`}
                onClick={() => setShowPinyin(!showPinyin)}
              >
                {showPinyin ? card.pinyin : "Show Pinyin"}
              </button>
              <button
                className={`reveal-btn ${showEnglish ? "revealed" : ""}`}
                onClick={() => setShowEnglish(!showEnglish)}
              >
                {showEnglish ? card.english : "Show Meaning"}
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="main-display pinyin-display">{card.pinyin}</div>

            <div className="reveals">
              <button
                className={`reveal-btn ${showCharacter ? "revealed" : ""}`}
                onClick={() => setShowCharacter(!showCharacter)}
              >
                {showCharacter ? card.character : "Show Character"}
              </button>
              <button
                className={`reveal-btn ${showEnglish ? "revealed" : ""}`}
                onClick={() => setShowEnglish(!showEnglish)}
              >
                {showEnglish ? card.english : "Show Meaning"}
              </button>
            </div>
          </>
        )}
      </div>

      <div className="nav-controls">
        <button className="nav-btn" onClick={prev}>← Prev</button>
        <button
          className={`shuffle-btn ${shuffled ? "active" : ""}`}
          onClick={toggleShuffle}
          title={shuffled ? "Restore order" : "Shuffle deck"}
        >
          {shuffled ? "🔀 Shuffled" : "🔀 Shuffle"}
        </button>
        <button className="nav-btn" onClick={next}>Next →</button>
      </div>
    </div>
  );
}
