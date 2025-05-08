import type { Color, PieceSymbol, Square } from "chess.js";

export const ChessBoard = ({ board }: {
  board: ({
    square: Square;
    type: PieceSymbol;
    color: Color;
  } | null)[][];
}) => {
  return (
    <div className="text-white">
      {board.map((row, i) => (
        <div key={i} className="flex">
          {row.map((square, j) => (
            <div
              key={j}
              className={`w-16 h-16 flex items-center justify-center text-xl font-bold ${
                (i + j) % 2 === 0 ? 'bg-green-500' : 'bg-green-700'
              }`}
            >
              {square ? square.type : ""}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};
