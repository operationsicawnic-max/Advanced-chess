import { state } from "./state.js";
import { makeAIMove } from "./engine.js";

export function initBoard(updateUI) {
  state.board = Chessboard("board", {
    draggable: true,
    position: "start",
    onDragStart: (source, piece) => {
      if (state.game.game_over()) return false;
      if (state.game.turn() === "b" && piece.startsWith("w")) return false;
    },
    onDrop: (source, target) => {
      const move = state.game.move({
        from: source,
        to: target,
        promotion: "q"
      });

      if (!move) return "snapback";

      updateUI();
      setTimeout(() =>
        makeAIMove(document.getElementById("level").value), 300);
    },
    onSnapEnd: () => {
      state.board.position(state.game.fen());
    }
  });
}
