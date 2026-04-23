# 中文 Study App

A flashcard app for studying Chinese characters, pinyin, vocabulary, and stroke order. Built with React + Vite.

## Features

### Study Modes

| Mode | Button | Primary Display | Reveal |
|------|--------|-----------------|--------|
| Chinese Characters | 字 | Character (你好) | Pinyin, English |
| Vocabulary | 词汇 (cíhuì) | Pinyin (nǐ hǎo) | Character, English |
| Stroke Order | 笔画 (bǐhuà) | Stroke name (横) or stroke shape (一) | Pinyin, English, Stroke/Character |

### Stroke Order Mode (笔画)

- Displays stroke name character (横) or stroke shape glyph (一) as primary
- **Switch to Stroke** / **Switch to Character** — toggle primary display
- Reveal buttons:
  - **Show Pinyin** — pronunciation (héng)
  - **Show English** — meaning (horizontal)
  - **Show Stroke** / **Show Character** — the other representation
- 19 strokes included in [src/data/strokeData.js](src/data/strokeData.js)

### Search

- Available in 字 and 词汇 modes
- Searches character, pinyin (tone marks optional — "ni" matches "nǐ"), and English
- Result count shown while query is active

### Navigation & Shuffle

- **← Prev** / **Next →** buttons
- **Shuffle** — randomizes deck order; toggle restores original order
- Deck and reveals reset on card change

### Practice Writing Canvas

- **Practice Writing** button shows/hides a drawing canvas below the card
- **Clear** button wipes the canvas
- Works with mouse (desktop) and touch (mobile)
- Canvas auto-clears when navigating to a new card

### Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `←` | Previous card |
| `→` | Next card |
| `S` | Toggle shuffle |

## Stack

- React 19
- Vite 8

## Getting Started

```bash
npm install
npm run dev
```

## Project Structure

```
src/
├── App.jsx              # Root: state, mode switching, search, layout
├── components/
│   └── StudyCard.jsx    # Flashcard display, navigation, shuffle, canvas
└── data/
    ├── defaultData.js   # 字 / 词汇 entries — edit to add vocabulary
    └── strokeData.js    # 笔画 entries — edit to add strokes
```

## Adding Vocabulary Entries

All vocabulary entries live in [src/data/defaultData.js](src/data/defaultData.js). Edit directly in VSCode — Vite hot-reloads instantly.

### Schema

```js
{ id: number, character: string, pinyin: string, english: string }
```

### Example

```js
export const defaultEntries = [
  { id: 1, character: "你好", pinyin: "nǐ hǎo", english: "hello" },
  // add here:
  { id: 11, character: "朋友", pinyin: "péng yǒu", english: "friend" },
];
```

**Rules:**
- `id` must be unique — use next sequential number or `Date.now()`
- `pinyin` — include tone marks

## Adding Stroke Entries

All stroke entries live in [src/data/strokeData.js](src/data/strokeData.js).

### Schema

```js
{ id: number, character: string, pinyin: string, english: string, stroke: string }
```

### Example

```js
export const strokeEntries = [
  { id: 1, character: "横", pinyin: "héng", english: "horizontal", stroke: "一" },
  // add here:
  { id: 20, character: "横折折", pinyin: "héng zhé zhé", english: "horizontal double-turn", stroke: "㇅" },
];
```

**Fields:**
- `character` — stroke name character
- `pinyin` — pronunciation with tone marks
- `english` — English description
- `stroke` — Unicode glyph representing the stroke shape (CJK Strokes block U+31C0–U+31EF, or common CJK radicals)

### Pinyin Tone Marks Reference

| Tone | Mark | Example |
|------|------|---------|
| 1st  | ā ē ī ō ū | māo (cat) |
| 2nd  | á é í ó ú | máng (busy) |
| 3rd  | ǎ ě ǐ ǒ ǔ | nǐ (you) |
| 4th  | à è ì ò ù | kàn (to look) |
| Neutral | a e i o u | ma (particle) |

## Scripts

| Command | Action |
|---------|--------|
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |
