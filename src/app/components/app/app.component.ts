import { Component, ViewChild, OnInit } from '@angular/core';
import { GameComponent, GameState } from '../game/game.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Tic tac toe';
  gameState: GameState;
  @ViewChild(GameComponent)
  public game: GameComponent;

  ngOnInit(): void {
    this.gameState = this.game.gameState;
  }

  newGame() {
    this.game.reset();
    this.gameState = this.game.gameState;
  }

  onTurnEnded(state: GameState) {
    this.gameState = state;
  }
}
