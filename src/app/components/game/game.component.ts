import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { BoardCellArgs, BoardComponent } from '../board/board.component';

export enum GameState {
  Player1Turn = 0,
  Player2Turn = 1,
  Won = 2,
  Draw = 3
}

/**
 * Tic-tac-toe game component.
 * Consists of board and gameplay logic.
 * @export
 * @class GameComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  gameEnded = false;
  gameState = GameState.Player1Turn;
  currentPlayerSymbol = 'X';
  @Input() boardSize = 3;

  /**
   * Indicates current game state on every end of a turn
   *
   * @memberof GameComponent
   */
  @Output()
  public turnEnded = new EventEmitter<GameState>();

  @ViewChild(BoardComponent)
  private _board: BoardComponent;

  constructor() {
  }

  ngOnInit() {
  }

  onCellClicked(args: BoardCellArgs) {
    if (!this.gameEnded) {
      this.playTurn(args.board, args.x, args.y);
    }
  }

  playTurn(board: any[], x: number, y: number) {
    if (board[x][y] == null) {
      board[x][y] = this.getPlayerSymbol(this.gameState);
      if (this.checkBoardForWin(board, 0, 0)) { // Win
        this.gameState = GameState.Won;
        this.gameEnded = true;
      } else if (this._board.isBoardFull) { // Draw
        this.gameState = GameState.Draw;
        this.gameEnded = true;
      } else { // Switch players and keep going
        this.switchPlayers();
      }

      this.turnEnded.emit(this.gameState);
    }
  }

  reset() {
    this.gameEnded = false;
    this.gameState = GameState.Player1Turn;
    this.currentPlayerSymbol = this.getPlayerSymbol(this.gameState);
    this._board.createBoard();
  }

  getPlayerSymbol(gameState: GameState) {
    switch (gameState) {
      case 0:
        return 'X';
      case 1:
        return 'O';
      default:
        return null;
    }
  }

  private switchPlayers() {
    this.gameState = this.gameState === GameState.Player1Turn ? GameState.Player2Turn : GameState.Player1Turn;
    this.currentPlayerSymbol = this.getPlayerSymbol(this.gameState);
  }

  private checkBoardForWin(board: any[], x: number, y: number): boolean {
    if (this.checkRightDiagonalWin(board)
      || this.checkLeftDiagonalWin(board)
      || this.checkRowWin(board)
      || this.checkColWin(board)) {
      return true;
    }

    return false;
  }

  private checkRightDiagonalWin(board: any[]): boolean {
    // verify top left cell is occupied before iterating.
    if (board[0][0] == null) {
      return false;
    }
    for (let i = 0; i < board.length - 1; i++) {
      if (board[i][i] !== board[i + 1][i + 1]) {
        return false;
      }
    }

    return true;
  }

  private checkLeftDiagonalWin(board: any[]): boolean {
    // verify bottom left cell is occupied before iterating.
    if (board[board.length - 1][0] == null) {
      return false;
    }
    for (let i = board.length - 1, j = 0; i > 0; i-- , j++) {
      if (board[i][j] !== board[i - 1][j + 1]) {
        return false;
      }
    }

    return true;
  }

  private checkRowWin(board: any[]): boolean {
    for (let i = 0; i < board.length; i++) {
      for (let j = 1; j < board.length; j++) {
        // skip if first cell of current row is empty
        if (board[i][0] == null) {
          break;
        }
        // no match
        if (board[i][j - 1] !== board[i][j]) {
          break;
        }

        // reached the end of the row successfully
        if (j === board.length - 1) {
          return true;
        }
      }
    }

    return false;
  }

  private checkColWin(board: any[]): boolean {
    for (let i = 0; i < board.length; i++) {
      for (let j = 1; j < board.length; j++) {
        // skip if first cell of the current column is empty
        if (board[0][i] == null) {
          break;
        }
        // no match
        if (board[j - 1][i] !== board[j][i]) {
          break;
        }

        // reached the end of the column successfully
        if (j === board.length - 1) {
          return true;
        }
      }
    }

    return false;
  }
}
