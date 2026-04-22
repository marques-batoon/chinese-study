# 中文 Study App

A flashcard app for studying Chinese characters, pinyin, and vocabulary. Built with React + Vite.

## Features

- **Two study modes**
  - *字 (Chinese Characters)* — shows character, reveal pinyin and English meaning
  - *词汇 (Vocabulary)* — shows pinyin, reveal character and English meaning
- **Shuffle deck** — randomize card order
- **Keyboard shortcuts** — navigate and shuffle without mouse

## Stack

- React 19
- Vite 8

## Getting Started

```bash
npm install
npm run dev
```

Open `http://localhost:5173`.

## Project Structure

```
src/
├── App.jsx              # Root: state, layout
├── components/
│   └── StudyCard.jsx    # Flashcard display, navigation, shuffle
└── data/
    └── defaultData.js   # All entries live here — edit this file to add/remove
```

## Adding Entries

All entries live in [src/data/defaultData.js](src/data/defaultData.js). Edit that file directly in VSCode.

### Entry schema

```js
{ id: number, character: string, pinyin: string, english: string }
```

### Example

```js
// src/data/defaultData.js
export const defaultEntries = [
  { id: 1, character: "你好", pinyin: "nǐ hǎo", english: "hello" },
  { id: 2, character: "谢谢", pinyin: "xiè xie", english: "thank you" },

  // Add your new entry here:
  { id: 11, character: "朋友", pinyin: "péng yǒu", english: "friend" },
];
```

**Rules:**
- `id` must be unique — use the next sequential number or `Date.now()`
- `character` — Chinese character(s)
- `pinyin` — romanized pronunciation with tone marks
- `english` — English meaning

Save the file and Vite hot-reloads instantly. No server restart needed.

### Pinyin tone marks reference

| Tone | Mark | Example |
|------|------|---------|
| 1st  | ā ē ī ō ū | māo (cat) |
| 2nd  | á é í ó ú | máng (busy) |
| 3rd  | ǎ ě ǐ ǒ ǔ | nǐ (you) |
| 4th  | à è ì ò ù | kàn (to look) |
| Neutral | a e i o u | ma (particle) |

Copy-paste tone marks or use a pinyin input method.

## Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `←` | Previous card |
| `→` | Next card |
| `S` | Toggle shuffle |

## Scripts

| Command | Action |
|---------|--------|
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |
# chinese-study
