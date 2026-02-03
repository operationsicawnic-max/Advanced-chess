import { state } from "./state.js";
import { makeAIMove } from "./engine.js";

export function initBoard(updateUI) {
  state.board = Chessboard("board", {
    draggable: true,
    position: "start",
    onDragStart: (s, p) => {
      if (state.game.game_over()) return false;
      if (state.game.turn() === 'b' && p.startsWith('w')) return false;
    },
    onDrop: (s, t) => {
      const move = state.game.move({ from: s, to: t, promotion: 'q' });
      if (!move) return "snapback";
      updateUI();
      setTimeout(() => makeAIMove(document.getElementById("level").value), 200);
    },
    onSnapEnd: () => state.board.position(state.game.fen())
  });
}
