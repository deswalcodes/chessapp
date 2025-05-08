import { Chess } from "chess.js";
import { WebSocket } from "ws";
import { GAME_OVER, INIT_GAME, MOVE } from "./messages";

export class Game {
  public player1: WebSocket;
  public player2: WebSocket;
  private board: Chess;
  private startTime: Date;

  constructor(player1: WebSocket, player2: WebSocket) {
    this.player1 = player1;
    this.player2 = player2;
    this.board = new Chess();
    this.startTime = new Date();

    // Send INIT_GAME only here
    this.player1.send(JSON.stringify({
      type: INIT_GAME,
      payload: { color: "white" },
    }));

    this.player2.send(JSON.stringify({
      type: INIT_GAME,
      payload: { color: "black" },
    }));
  }

  addMove(socket: WebSocket, move: { from: string; to: string }) {
    // Check if correct player is moving
    const currentTurn = this.board.turn();
    if ((currentTurn === 'w' && socket !== this.player1) ||
        (currentTurn === 'b' && socket !== this.player2)) {
      console.log("Not this player's turn");
      return;
    }

    try {
      const result = this.board.move(move);
      if (!result) {
        console.log("Illegal move");
        return;
      }
    } catch (e) {
      console.log("Move error:", e);
      return;
    }

    // Game over check
    if (this.board.isGameOver()) {
      const winner = this.board.turn() === "w" ? "black" : "white";
      const gameOverPayload = JSON.stringify({
        type: GAME_OVER,
        payload: { winner },
      });
      this.player1.send(gameOverPayload);
      this.player2.send(gameOverPayload);
      return;
    }

    // Send move to opponent
    const opponent = (socket === this.player1) ? this.player2 : this.player1;
    opponent.send(JSON.stringify({
      type: MOVE,
      payload: { move },
    }));
  }
}
