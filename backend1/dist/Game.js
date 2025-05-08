"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = void 0;
const chess_js_1 = require("chess.js");
const messages_1 = require("./messages");
class Game {
    constructor(player1, player2) {
        this.player1 = player1;
        this.player2 = player2;
        this.board = new chess_js_1.Chess();
        this.startTime = new Date();
        // Send INIT_GAME only here
        this.player1.send(JSON.stringify({
            type: messages_1.INIT_GAME,
            payload: { color: "white" },
        }));
        this.player2.send(JSON.stringify({
            type: messages_1.INIT_GAME,
            payload: { color: "black" },
        }));
    }
    addMove(socket, move) {
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
        }
        catch (e) {
            console.log("Move error:", e);
            return;
        }
        // Game over check
        if (this.board.isGameOver()) {
            const winner = this.board.turn() === "w" ? "black" : "white";
            const gameOverPayload = JSON.stringify({
                type: messages_1.GAME_OVER,
                payload: { winner },
            });
            this.player1.send(gameOverPayload);
            this.player2.send(gameOverPayload);
            return;
        }
        // Send move to opponent
        const opponent = (socket === this.player1) ? this.player2 : this.player1;
        opponent.send(JSON.stringify({
            type: messages_1.MOVE,
            payload: { move },
        }));
    }
}
exports.Game = Game;
