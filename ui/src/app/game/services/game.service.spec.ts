import {TestBed} from '@angular/core/testing';

import {GameService} from './game.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {GameBoard} from "../game-board/game-board.component";

describe('GameService', () => {
  let httpClient: HttpTestingController;
  let service: GameService;

  beforeEach(() => TestBed.configureTestingModule({imports: [HttpClientTestingModule]}));
  beforeEach(() => {
    httpClient = TestBed.get(HttpTestingController);
    service = TestBed.get(GameService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getBoard', () => {

    it('should retrieve GameBoards', () => {
      const expected = [new GameBoard('X', 1)];
      service.getBoard().subscribe(res => {
        expect(res).toBe(expected)
      }, () => {
        throw(Error('should not be reached'));
      });
      const req = httpClient.expectOne('game/boards');
      req.flush(expected);
      expect(req.request.method).toBe('GET');
      httpClient.verify();
    });

    it('Should return error if req fails', () => {
      const errorText = 'Server error';
      const errorCode = 500;
      service.getBoard().subscribe(() => {
        throw(Error('should not be reached'));
      }, error => {
        expect(error.status).toBe(errorCode);
        expect(error.statusText).toBe(errorText);
      });
      const req = httpClient.expectOne('game/boards');
      req.error(new ErrorEvent(''), {status: errorCode, statusText: errorText});
      expect(req.request.method).toBe('GET');
      httpClient.verify();
    });

  });

  describe('updateBoard', () => {

    it('should update board',  () => {
      const expected = [new GameBoard('X', 1)];
      service.updateBoard(new GameBoard('X', 1)).subscribe(res => {
        expect(res).toBe(expected)
      }, () => {
        throw(Error('should not be reached'));
      });
      const req = httpClient.expectOne('game/update');
      req.flush(expected);
      expect(req.request.method).toBe('PUT');
      httpClient.verify();
    });

    it('Should return error if req fails', () => {
      const errorText = 'Server error';
      const errorCode = 500;
      service.updateBoard(new GameBoard('X', 1)).subscribe(() => {
        throw(Error('should not be reached'));
      }, error => {
        expect(error.status).toBe(errorCode);
        expect(error.statusText).toBe(errorText);
      });
      const req = httpClient.expectOne('game/update');
      req.error(new ErrorEvent(''), {status: errorCode, statusText: errorText});
      expect(req.request.method).toBe('PUT');
      httpClient.verify();
    });

  });

  describe('reset', () => {

    it('should reset board',  () => {
      const expected = [new GameBoard('X', 1)];
      service.reset().subscribe(res => {
        expect(res).toBe(expected)
      }, () => {
        throw(Error('should not be reached'));
      });
      const req = httpClient.expectOne('game/reset');
      req.flush(expected);
      expect(req.request.method).toBe('POST');
      httpClient.verify();
    });

    it('Should return error if req fails', () => {
      const errorText = 'Server error';
      const errorCode = 500;
      service.reset().subscribe(() => {
        throw(Error('should not be reached'));
      }, error => {
        expect(error.status).toBe(errorCode);
        expect(error.statusText).toBe(errorText);
      });
      const req = httpClient.expectOne('game/reset');
      req.error(new ErrorEvent(''), {status: errorCode, statusText: errorText});
      expect(req.request.method).toBe('POST');
      httpClient.verify();
    });

  });

});
