import {async, ComponentFixture, TestBed, tick} from '@angular/core/testing';

import {GameBox, GameBoardComponent} from './game-board.component';
import {GameService} from "../services/game.service";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {of} from "rxjs";

describe('GameBoardComponent', () => {
  let component: GameBoardComponent;
  let fixture: ComponentFixture<GameBoardComponent>;
  let service: GameService;
  const initialBoard = [new GameBox("", 1),
                        new GameBox("", 2),
                        new GameBox("", 3),
                        new GameBox("", 4),
                        new GameBox("", 5),
                        new GameBox("", 6),
                        new GameBox("", 7),
                        new GameBox("", 8),
                        new GameBox("", 9)];

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      declarations: [GameBoardComponent],
      imports: [HttpClientTestingModule,
        MatButtonModule,
        MatCardModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameBoardComponent);
    service = TestBed.get(GameService);

  });

  it('should create', () => {
    component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('Calls service getBoard to list board ', () => {
    const getBoardSpy = spyOn(service, 'getBoard').and.returnValue(of(initialBoard));
    component = fixture.componentInstance;
    fixture.detectChanges();

    expect(getBoardSpy).toHaveBeenCalled();
  });

  it('Expect board preloaded with returned backend values', () => {
    const board = initialBoard.map(b => { return b.position === 2? new GameBox('X', 2): b});
    spyOn(service, 'getBoard').and.returnValue(of(board));
    component = fixture.componentInstance;
    fixture.detectChanges();

    const box2 = fixture.nativeElement.querySelectorAll('#uit-game-board-box-2')[0];
    expect(box2.textContent.trim()).toBe('X');
    expect(component.currentPlayer).toBe(component.PLAYER_O);
  });

  it('Calls updateBoard service method onclick', async() => {
    spyOn(service, 'getBoard').and.returnValue(of(initialBoard));
    component = fixture.componentInstance;
    await fixture.detectChanges();

    const boxClickSpy = spyOn(component, 'click');
    const box2 = fixture.nativeElement.querySelectorAll('#uit-game-board-box-2')[0];

    box2.click();
    await fixture.detectChanges();

    expect(boxClickSpy).toHaveBeenCalledWith(new GameBox('', 2));
  });


  it('click calls updateBoard service method onclick', async() => {

    const board = initialBoard.map(b => { return b.position === 2? new GameBox('X', 2): b});
    const expected = board.map(b => { return b.position === 3? new GameBox('O', 3): b});
    spyOn(service, 'getBoard').and.returnValue(of(board));
    component = fixture.componentInstance;
    await fixture.detectChanges();

    const serviceUpdateSpy = spyOn(service, 'updateBoard').and.returnValue(of(expected));

    component.click(new GameBox('', 3));
    expect(serviceUpdateSpy).toHaveBeenCalledWith(new GameBox('O', 3));
  });


  it('On reset click resets the game', async() => {
    const board = initialBoard.map(b => { return b.position === 2? new GameBox('X', 2): b});
    spyOn(service, 'getBoard').and.returnValue(of(board));

    component = fixture.componentInstance;
    const resetSpy = spyOn(component, 'reset');
    await fixture.detectChanges();

    const resetButton = fixture.nativeElement.querySelectorAll('#uit-board-game-reset')[0];
    resetButton.dispatchEvent(new MouseEvent("click"));
    await fixture.detectChanges();

    expect(resetSpy).toHaveBeenCalled();
  });

  it('reset() method calls service method reset', () => {
    const board = initialBoard.map(b => { return b.position === 2? new GameBox('X', 2): b});
    spyOn(service, 'getBoard').and.returnValue(of(board));
    const resetServiceSpy = spyOn(service, 'reset').and.returnValue(of(initialBoard));
    component = fixture.componentInstance;
    fixture.detectChanges();

    component.reset();

    expect(resetServiceSpy).toHaveBeenCalled();
  });

  it('Displays drawn game ', () => {
    const board = [new GameBox("O", 1),
                    new GameBox("X", 2),
                    new GameBox("X", 3),
                    new GameBox("X", 4),
                    new GameBox("X", 5),
                    new GameBox("O", 6),
                    new GameBox("O", 7),
                    new GameBox("O", 8),
                    new GameBox("X", 9)];
    spyOn(service, 'getBoard').and.returnValue(of(board));
    component = fixture.componentInstance;
    fixture.detectChanges();

    const drawMessage = fixture.nativeElement.querySelectorAll('#uit-game-draw-message')[0];
    expect(drawMessage).toBeDefined();
    expect(component.gameOver).toBe(true);
  });

  it('Displays drawn game on click', () => {
    const board = [new GameBox("O", 1),
      new GameBox("X", 2),
      new GameBox("X", 3),
      new GameBox("X", 4),
      new GameBox("X", 5),
      new GameBox("O", 6),
      new GameBox("O", 7),
      new GameBox("O", 8),
      new GameBox("", 9)];
    spyOn(service, 'getBoard').and.returnValue(of(board));
    spyOn(service, 'updateBoard').and.returnValue(of(board.map(b => {return b.position === 9 ? new GameBox('X', 9): b})));

    component = fixture.componentInstance;
    fixture.detectChanges();

    component.click(new GameBox('', 9));

    expect(component.gameOver).toBe(true);
    expect(component.winner).toBe(component.DRAW);
  });

  it('Detects game win on load', () => {
    const board = [new GameBox("X", 1),
      new GameBox("X", 2),
      new GameBox("X", 3),
      new GameBox("O", 4),
      new GameBox("O", 5),
      new GameBox("", 6),
      new GameBox("", 7),
      new GameBox("", 8),
      new GameBox("", 9)];

    spyOn(service, 'getBoard').and.returnValue(of(board));
    component = fixture.componentInstance;
    fixture.detectChanges();

    const drawMessage = fixture.nativeElement.querySelectorAll('.uit-game-winner')[0];
    expect(drawMessage).toBeDefined();
    expect(drawMessage.textContent.trim()).toBe('Winner : Player 1');
    expect(component.gameOver).toBe(true);

  });


  it('Detects game win on click', () => {
    const board = [new GameBox("X", 1),
      new GameBox("X", 2),
      new GameBox("", 3),
      new GameBox("O", 4),
      new GameBox("O", 5),
      new GameBox("", 6),
      new GameBox("", 7),
      new GameBox("", 8),
      new GameBox("", 9)];

    spyOn(service, 'getBoard').and.returnValue(of(board));
    component = fixture.componentInstance;
    fixture.detectChanges();
    const expected = board.map(b => { return b.position === 3? new GameBox('X', 3): b});
    spyOn(service, 'updateBoard').and.returnValue(of(expected));
    component.click(new GameBox('', 3));

    expect(component.gameOver).toBe(true);
    expect(component.winner).toBe(component.PLAYER_X);
  });

});
