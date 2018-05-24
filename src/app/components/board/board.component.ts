import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Logger } from '../../core/logger.service';

export interface BoardCellArgs {
  board: any[];
  x: number;
  y: number;
  cellsSelected: number;
}

/**
 * Generic board component.
 * Can be used in all sorts of board based games.
 *
 * @export
 * @class BoardComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  /**
   * receive number of rows from parent component.
   * @memberof BoardComponent
   */
  @Input() public rows = 3;

  /**
   * receive number of columns from parent component.
   * @memberof BoardComponent
   */
  @Input() public columns = 3;

  /**
   * Indicates cell click event.
   * @memberof BoardComponent
   */
  @Output()
  public cellClicked = new EventEmitter<BoardCellArgs>();

  board = [];

  private _cellsSelected = 0;

  // REFACTOR: Implement a general way to iterate numbers instead of arrays
  private _rowsArray: any[];
  private _columnsArray: any[];

  public get rowsArray() {
    return this._rowsArray;
  }
  public get columnsArray() {
    return this._columnsArray;
  }

  /**
   * Inidicates if all board cells contain values.
   *
   * @readonly
   * @memberof BoardComponent
   */
  public get isBoardFull() {
    return this.rows * this.columns === this._cellsSelected;
  }

  constructor(private logger: Logger) {
    this._rowsArray = [this.rows];
    this._columnsArray = [this.columns];
    for (let index = 0; index < this.rows; index++) {
      this._rowsArray[index] = index;
    }
    for (let index = 0; index < this.columns; index++) {
      this._columnsArray[index] = index;
    }

    this.createBoard();
  }

  /**
   * Initilize two dimensional array to store board data
   *
   * @memberof BoardComponent
   */
  createBoard() {
    this.board = [];
    this._cellsSelected = 0;
    for (let row = 0; row < this.rows; row++) {
      this.board [row] = [];
      for (let col = 0; col < this.columns; col++) {
        this.board[row][col] = null;
      }
    }
  }

  ngOnInit() {
  }

  selectedCell(x, y) {
    this.logger.log(`cell clicked in x:${x}, y:${y}`);
    // Count the number of empty cells clicked (used to keep track when board is full)
    if (this.board[x][y] == null) {
      this._cellsSelected++;
    }
    this.cellClicked.emit({board: this.board, x, y, cellsSelected: this._cellsSelected});
  }

  displayValue(x, y) {
    return this.board[x][y];
  }

  isCellOccupied(x, y): boolean {
    return this.board[x][y] != null;
  }
}
