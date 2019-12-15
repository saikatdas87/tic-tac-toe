import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {GameBox} from "../game-board/game-board.component";

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(private http: HttpClient) {
  }

  getBoard(): Observable<GameBox[]> {
    return this.http.get<GameBox[]>('game/boards')
  }

  updateBoard(board: GameBox | undefined): Observable<GameBox[]> {
    return this.http.put<GameBox[]>('game/update', board);
  }

  reset(): Observable<GameBox[]> {
    return this.http.post<GameBox[]>('game/reset', []);
  }
}
