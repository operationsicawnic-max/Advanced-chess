import { state } from "./state.js";
import { initEngine } from "./engine.js";
import { initBoard } from "./board.js";
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
  else statusEl.textContent = (state.game.turn() === 'w' ? "White" : "Black") + " to move";
}

function newGame() {
  stopTimer();
  state.board.destroy();
  state.game = new Chess();
  state.whiteTime = state.blackTime = 300;
  initBoard(updateUI);
  updateUI();
  startTimer(updateUI);
}

function undoMove() {
  state.game.undo();
  state.game.undo();
  updateUI();
}

document.getElementById("newGameBtn").onclick = newGame;
document.getElementById("undoBtn").onclick = undoMove;
document.getElementById("themeBtn").onclick = () =>
  document.body.classList.toggle("light");

function init() {
  state.game = new Chess();
  initEngine(m => {
    state.game.move({ from: m.slice(0,2), to: m.slice(2,4), promotion: 'q' });
    updateUI();
  });
  initBoard(updateUI);
  updateUI();
  startTimer(updateUI);
}

init();
