import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { BoardComponent } from './components/board/board.component';
import { AppComponent } from './components/app/app.component';
import { Logger } from './core/logger.service';
import { GameComponent } from './components/game/game.component';

@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    GameComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [Logger],
  bootstrap: [AppComponent]
})
export class AppModule { }
