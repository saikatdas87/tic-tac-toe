import {Component, OnInit} from '@angular/core';
import {GameService} from "../services/game.service";

export class GameBoard {
  value: string = '';
  readonly position: number = 0;
  winner?: boolean;

  constructor(value: string, position: number) {
    this.value = value;
    this.position = position;
  }

}

export class Player {
  readonly name: string;
  readonly symbol: string;

  constructor(name: string, symbol: string) {
    this.name = name;
    this.symbol = symbol;
  }
}

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.less']
})
export class GameBoardComponent implements OnInit {

  PLAYER_X = new Player('Player 1', 'X');
  PLAYER_O = new Player('Player 2', 'O');
  DRAW = new Player('Draw', '');

  board: GameBoard[] = [];
  currentPlayer = this.PLAYER_X;
  winner: any;
  gameOver: boolean | undefined;
  boardLocked: boolean | undefined;
  gameError: boolean = false;

  constructor(private gameService: GameService) {
  }

  ngOnInit() {
    this.gameService.getBoard().subscribe(b => {
      this.initializeGame(b);
      this.showGameOverIfAlreadyWon();
    }, error => {
      this.boardLocked = true;
      this.gameError = true;
    });
  }

  click(square: GameBoard) {
    if (square.value === '' && !this.gameOver) {
      square.value = this.currentPlayer.symbol;
      this.gameService.updateBoard(square).subscribe((res) => {
        this.board = res;
        this.completeMove(this.currentPlayer);
      }, error => {
        this.boardLocked = true;
        this.gameError = true;
      });

    }
  }

  completeMove(player: Player) {
    if (this.isWinner(player.symbol))
      this.showGameOver(player);
    else if (!this.availableSquaresExist())
      this.showGameOver(this.DRAW);
    else {
      this.currentPlayer = (this.currentPlayer == this.PLAYER_O ? this.PLAYER_X : this.PLAYER_O);
    }
  }

  showGameOverIfAlreadyWon() {
    if (this.isWinner(this.PLAYER_X.symbol)) {
      this.showGameOver(this.PLAYER_X);
    } else if (this.isWinner(this.PLAYER_O.symbol)) {
      this.showGameOver(this.PLAYER_O);
    } else if (this.board.filter(b => b.value === '').length === 0) {
      this.showGameOver(this.DRAW);
    }
  }

  availableSquaresExist(): boolean {
    return this.board.filter(s => s.value == '').length > 0;
  }

  showGameOver(winner: Player) {
    this.gameOver = true;
    this.winner = winner;

    if (winner !== this.DRAW)
      this.currentPlayer = winner;
  }

  get winingCombinations(): number[][] {
    return [
      [0, 1, 2],  //top row
      [3, 4, 5],  //middle row
      [6, 7, 8],  //bottom row
      [0, 3, 6],  //first col
      [1, 4, 7],  //second col
      [2, 5, 8],  //third col
      [0, 4, 8],  //first diagonal
      [2, 4, 6]   //second diagonal
    ];
  }

  isWinner(symbol: string): boolean {
    for (let pattern of this.winingCombinations) {
      const foundWinner = this.board[pattern[0]].value == symbol
        && this.board[pattern[1]].value == symbol
        && this.board[pattern[2]].value == symbol;

      if (foundWinner) {
        for (let index of pattern) {
          this.board[index].winner = true;
        }
        return true;
      }
    }
    return false;
  }

  initializeGame(gameBoards: GameBoard[]) {
    this.board = gameBoards;
    this.gameOver = false;
    this.boardLocked = false;
    this.gameError = false;

    const xInputs = this.board.filter(b => b.value === this.PLAYER_X.symbol);
    const oInputs = this.board.filter(b => b.value === this.PLAYER_O.symbol);

    if (xInputs.length > oInputs.length) {
      this.currentPlayer = this.PLAYER_O;
    }
  }

  reset(): void {
    this.gameService.reset().subscribe((res) => {
      this.initializeGame(res);
      this.currentPlayer = this.PLAYER_X;
    }, error => {
      this.boardLocked = true;
      this.gameError = true;
    })
  }
}
