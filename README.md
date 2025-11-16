# 🎮 Pokémon Quiz — Who's That Pokémon?

`README Disclaimer: README.md is partially generated and formatted using AI`

A compact, fast-paced React quiz game that tests your Pokémon knowledge.
Players have **120 seconds** to guess as many Pokémon as possible. Each round shows an image and 3 answer choices — get it right for **+1**, wrong for **−1**. The app uses **Zustand** for state management and fetches data from the **PokéAPI**.

---

## 🚀 Live demo

*(Add your deployed demo link here — e.g. Vercel / Netlify / GitHub Pages)*

---

## ✨ Key features

* Stage-based UX: **menu → quiz → quizOver**
* Centralized state with **Zustand**
* 120-second countdown timer
* 3 random Pokémon per question; one correct answer
* Score updates: **+1** for correct, **−1** for incorrect (score never goes below 0)
* Fallback image when official artwork is missing
* Clean, modular components:
  * `QuizMenu`, `PokemonQuiz`, `QuizStats`, `QuizPokemonImage`, `QuizChoiceButtons`, `QuizOver`
* Simple, responsive CSS with animations (pulse / shake)

---

## 🧩 How the quiz works (short)

1. On the **menu**, player clicks **Start Quiz**.
2. Store sets `stage: "quiz"`, `timeLeft: 120`, `isQuizActive: true`, `score: 0` and triggers `getNewQuestion`.
3. `getNewQuestion` fetches 3 random Pokémon (from PokéAPI). One becomes the correct answer, choices are shuffled.
4. Player chooses an answer:
   * Correct → `score++`
   * Incorrect → `score = Math.max(0, score - 1)`
5. After a 1s delay the next question appears (if time remains).
6. When `timeLeft` reaches 0, store sets `stage: "quizOver"` and `isQuizActive: false`, showing the result screen.

---

## 📁 Project structure

```
src/
├─ components/
│  ├─ PokemonQuiz.jsx        # Root quiz component (handles timer & stage switch)
│  ├─ QuizMenu.jsx           # Start menu
│  ├─ QuizStats.jsx          # Score & timer + Start New Game button
│  ├─ QuizPokemonImage.jsx   # Pokemon image panel
│  ├─ QuizChoiceButtons.jsx  # Answer buttons & local selection state
│  └─ QuizOver.jsx           # Final screen with win/lose image
├─ stores/
│  └─ pokemonQuizStore.js    # Zustand store: stage, score, currentPokemon, choices, timeLeft, isQuizActive
├─ image/                    # assets: whos-that-pokemon.jpg, youwin.png, youlost.png, pokemonquiz.png
├─ index.css                 # Styles (buttons, layout, keyframes)
├─ App.jsx
└─ main.jsx
```

---

## 🔧 State (Zustand) — important selectors & actions

```js
// state shape (simplified)
{
  stage: "menu" | "quiz" | "quizOver",
  score: number,
  currentPokemon: { name: string, image: string },
  choices: string[],        // length 3
  timeLeft: number,         // seconds (120)
  isQuizActive: boolean
}

// actions
startQuiz()       // set stage, reset score/time, fetch first question
getNewQuestion()  // fetch 3 random pokemon, set currentPokemon & choices
checkAnswer(str)  // update score (+1 / -1 floored to 0)
resetGame()       // reset and fetch new question
decrementTime()   // ticks timer; when <=0 sets quizOver stage
```

---

## 🌐 External API

* PokéAPI — `https://pokeapi.co/api/v2/pokemon/{id}`
* The app requests 3 random IDs (1..1025) per question.
* If official artwork is missing, the store uses `whos-that-pokemon.jpg` as a fallback.

---

## ⚙️ Installation & run

```bash
# Clone repo
git clone https://github.com/Lukatami/pokequiz.git
cd pokequiz

# Install
npm install

# Run locally
npm run dev
```

---

## 👨‍💻 Author

Dmitrii Izrailit – PokeQuiz react app
