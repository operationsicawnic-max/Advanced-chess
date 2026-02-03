import { state } from "./state.js";

export function startTimer(updateUI) {
  stopTimer();
  state.timer = setInterval(() => {
    if (state.game.turn() === "w") state.whiteTime--;
    else state.blackTime--;
    updateUI();
  }, 1000);
}

export function stopTimer() {
  if (state.timer) {
    clearInterval(state.timer);
    state.timer = null;
  }
}

export function formatTime(sec) {
  return Math.floor(sec / 60) + ":" + String(sec % 60).padStart(2, "0");
}
