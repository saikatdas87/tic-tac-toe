import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {GameBoard} from "../game-board/game-board.component";

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(private http: HttpClient) {
  }

  getBoard(): Observable<GameBoard[]> {
    return this.http.get<GameBoard[]>('game/boards')
  }

  updateBoard(board: GameBoard | undefined): Observable<GameBoard[]> {
    return this.http.put<GameBoard[]>('game/update', board);
  }

  reset(): Observable<GameBoard[]> {
    return this.http.post<GameBoard[]>('game/reset', []);
  }
}
