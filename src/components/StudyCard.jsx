import { useState, useEffect, useRef } from "react";

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
  const [showCanvas, setShowCanvas] = useState(false);

  const canvasRef = useRef(null);
  const isDrawing = useRef(false);

  useEffect(() => {
    setDeck([...entries]);
    setIndex(0);
    resetReveals();
    setShuffled(false);
  }, [entries, mode]);

  // Size canvas to its CSS dimensions when shown or window resizes
  useEffect(() => {
    if (!showCanvas) return;
    function sizeCanvas() {
      const canvas = canvasRef.current;
      if (!canvas) return;
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    }
    sizeCanvas();
    window.addEventListener("resize", sizeCanvas);
    return () => window.removeEventListener("resize", sizeCanvas);
  }, [showCanvas]);

  function resetReveals() {
    setShowPinyin(false);
    setShowCharacter(false);
    setShowEnglish(false);
  }

  function clearCanvas() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
  }

  function goTo(i) {
    setIndex(i);
    resetReveals();
    clearCanvas();
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

  function getPos(e, canvas) {
    const rect = canvas.getBoundingClientRect();
    const src = e.touches ? e.touches[0] : e;
    return { x: src.clientX - rect.left, y: src.clientY - rect.top };
  }

  function startDraw(e) {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const pos = getPos(e, canvas);
    isDrawing.current = true;
    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);
  }

  function draw(e) {
    if (!isDrawing.current) return;
    e.preventDefault();
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const pos = getPos(e, canvas);
    ctx.lineTo(pos.x, pos.y);
    ctx.strokeStyle = "#93c5fd";
    ctx.lineWidth = 3;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.stroke();
  }

  function stopDraw() {
    isDrawing.current = false;
  }

  if (deck.length === 0) {
    return (
      <div className="empty-state">
        <p>No entries. Add some to defaultData.js</p>
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

      <div className="canvas-controls">
        <button
          className={`canvas-toggle-btn ${showCanvas ? "active" : ""}`}
          onClick={() => setShowCanvas(!showCanvas)}
        >
          {showCanvas ? "Hide Practice" : "Practice Writing"}
        </button>
        {showCanvas && (
          <button className="canvas-clear-btn" onClick={clearCanvas}>
            Clear
          </button>
        )}
      </div>

      {showCanvas && (
        <canvas
          ref={canvasRef}
          className="practice-canvas"
          onMouseDown={startDraw}
          onMouseMove={draw}
          onMouseUp={stopDraw}
          onMouseLeave={stopDraw}
          onTouchStart={startDraw}
          onTouchMove={draw}
          onTouchEnd={stopDraw}
        />
      )}

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
