import { state } from "./state.js";
import { initBoard } from "./board.js";
import { initEngine } from "./engine.js";
import { startTimer, stopTimer, formatTime } from "./timer.js";

const wTime = document.getElementById("wTime");
const bTime = document.getElementById("bTime");
const statusEl = document.getElementById("status");
const movesEl = document.getElementById("moves");

function updateUI() {
  wTime.textContent = formatTime(state.whiteTime);
  bTime.textContent = formatTime(state.blackTime);
  movesEl.innerHTML = state.game.history().join("<br>");

  if (state.game.in_checkmate()) statusEl.textContent = "♚ Checkmate!";
  else if (state.game.in_check()) statusEl.textContent = "⚠️ Check!";
  else statusEl.textContent =
    (state.game.turn() === "w" ? "White" : "Black") + " to move";
}

function newGame() {
  stopTimer();
  state.game = new Chess();
  state.whiteTime = state.blackTime = 300;
  state.board.destroy();
  initBoard(updateUI);
  updateUI();
  startTimer(updateUI);
}

function undoMove() {
  state.game.undo();
  state.game.undo();
  updateUI();
}

function onAIMove(move) {
  state.game.move({
    from: move.slice(0, 2),
    to: move.slice(2, 4),
    promotion: "q"
  });
  updateUI();
}

document.addEventListener("DOMContentLoaded", () => {
  state.game = new Chess();
  initEngine(onAIMove);
  initBoard(updateUI);
  updateUI();
  startTimer(updateUI);

  document.getElementById("newGameBtn").onclick = newGame;
  document.getElementById("undoBtn").onclick = undoMove;
  document.getElementById("themeBtn").onclick =
    () => document.body.classList.toggle("light");
});
