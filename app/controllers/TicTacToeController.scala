package controllers

import javax.inject._
import models.Board
import play.api.libs.json.{JsError, JsValue, Json}
import play.api.mvc._


@Singleton
class TicTacToeController @Inject()(cc: ControllerComponents) extends AbstractController(cc) {

  private val emptyBoard: Array[Board] = Array[Board](Board("", 1),
                                                      Board("", 2),
                                                      Board("", 3),
                                                      Board("", 4),
                                                      Board("", 5),
                                                      Board("", 6),
                                                      Board("", 7),
                                                      Board("", 8),
                                                      Board("", 9))
  private var gameBoard: Array[Board] = emptyBoard

  def updateBoard(): Action[JsValue] = Action(parse.json) { implicit request =>
    request.body.validate[Board].fold(error => BadRequest(JsError.toJson(error)),
      {
        case Board(_, p) if p > 9 || p < 1 =>
          BadRequest("Invalid position")
        case updatedBoard =>
          gameBoard = gameBoard.map(board => {
            if (board.position == updatedBoard.position) Board(updatedBoard.value, board.position) else board
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

