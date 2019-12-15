package controllers

import javax.inject._
import models.GameBox
import play.api.libs.json.{JsError, JsValue, Json}
import play.api.mvc._


@Singleton
class TicTacToeController @Inject()(cc: ControllerComponents) extends AbstractController(cc) {

  private val emptyBoard: Array[GameBox] = Array[GameBox](GameBox("", 1),
                                                          GameBox("", 2),
                                                          GameBox("", 3),
                                                          GameBox("", 4),
                                                          GameBox("", 5),
                                                          GameBox("", 6),
                                                          GameBox("", 7),
                                                          GameBox("", 8),
                                                          GameBox("", 9))
  private var gameBoard: Array[GameBox] = emptyBoard

  def updateBoard(): Action[JsValue] = Action(parse.json) { implicit request =>
    request.body.validate[GameBox].fold(error => BadRequest(JsError.toJson(error)),
      {
        case GameBox(_, p) if p > 9 || p < 1 =>
          BadRequest("Invalid position")
        case updatedBoard =>
          gameBoard = gameBoard.map(board => {
            if (board.position == updatedBoard.position) GameBox(updatedBoard.value, board.position) else board
          })
          Ok(Json.toJson(gameBoard))
      })
  }

  def getBoard: Action[AnyContent] = Action {
    Ok(Json.toJson(gameBoard))
  }

  def reset: Action[AnyContent] = Action {
    gameBoard = emptyBoard
    Ok(Json.toJson(gameBoard))
  }
}

