import { state } from "./state.js";

export function initEngine(onAIMove) {
  state.engine = new Worker(
    "https://cdn.jsdelivr.net/gh/niklasf/stockfish.js@master/src/stockfish.js"
  );

  state.engine.onmessage = e => {
    if (e.data.startsWith("bestmove")) {
      const m = e.data.split(" ")[1];
      onAIMove(m);
    }
  };
}

export function makeAIMove(depth) {
  if (state.game.game_over()) return;
  state.engine.postMessage("position fen " + state.game.fen());
  state.engine.postMessage("go depth " + depth);
}
