import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GameBoardComponent} from './game-board/game-board.component';
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";


@NgModule({
  declarations: [GameBoardComponent],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
  ]
})
export class GameModule {
}
