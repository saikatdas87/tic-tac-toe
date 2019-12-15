package controller

import controllers.TicTacToeController
import models.GameBox
import org.scalatestplus.play._
import org.scalatestplus.play.guice._
import play.api.libs.json.Json
import play.api.test._
import play.api.test.Helpers._

class TicTacToeControllerTest extends PlaySpec with GuiceOneAppPerTest with Injecting {

  private val emptyBoard: Array[GameBox] = Array[GameBox](GameBox("", 1),
                                                          GameBox("", 2),
                                                          GameBox("", 3),
                                                          GameBox("", 4),
                                                          GameBox("", 5),
                                                          GameBox("", 6),
                                                          GameBox("", 7),
                                                          GameBox("", 8),
                                                          GameBox("", 9))

  "TicTacToeController GET" should {

    "Return the List of Game Board values" in {
      val controller = new TicTacToeController(stubControllerComponents())
      val home = controller.getBoard().apply(FakeRequest(GET, "game/boards"))

      status(home) mustBe OK
      contentType(home) mustBe Some("application/json")
      val resultJson = contentAsJson(home)
      resultJson.toString() mustBe Json.toJson(emptyBoard).toString()
    }

    "Return current value if value updated" in {
      val controller = new TicTacToeController(stubControllerComponents())
      controller.updateBoard().apply(FakeRequest(PUT, "game/update").withBody(Json.toJson(GameBox("X", 3))))
      val home = controller.getBoard().apply(FakeRequest(GET, "game/boards"))
      val expected = emptyBoard.map(board => {
        if (board.position == 3) GameBox("X", board.position) else board
      })
      status(home) mustBe OK
      contentType(home) mustBe Some("application/json")
      val resultJson = contentAsJson(home)
      resultJson.toString() mustBe Json.toJson(expected).toString()
    }
  }

  "TicTacToeController PUT" should {

    "Update a box and return the List of Game Boards" in {
      val controller = new TicTacToeController(stubControllerComponents())
      val home = controller.updateBoard().apply(FakeRequest(PUT, "game/update").withBody(Json.toJson(GameBox("X", 1))))

      status(home) mustBe OK
      contentType(home) mustBe Some("application/json")
      val resultJson = contentAsJson(home)
      resultJson.toString() mustBe Json.toJson(emptyBoard.map(board => {
        if (board.position == 1) GameBox("X", board.position) else board
      })).toString()
    }

    "Returns error if Request fails to parse" in {
      val controller = new TicTacToeController(stubControllerComponents())
      val home = controller.updateBoard().apply(FakeRequest(PUT, "game/update").withBody(Json.toJson(emptyBoard)))

      status(home) mustBe BAD_REQUEST
    }

    "Returns error if Board position is not between 1 -9" in {
      val controller = new TicTacToeController(stubControllerComponents())
      val home = controller.updateBoard().apply(FakeRequest(PUT, "game/update").withBody(Json.toJson(GameBox("X", 10))))

      status(home) mustBe BAD_REQUEST
    }
  }

  "TicTacToeController POST" should {

    "Resets Game Board values" in {
      val controller = new TicTacToeController(stubControllerComponents())
      val home = controller.reset().apply(FakeRequest(POST, "game/reset"))

      status(home) mustBe OK
      contentType(home) mustBe Some("application/json")
      val resultJson = contentAsJson(home)
      resultJson.toString() mustBe Json.toJson(emptyBoard).toString()
    }
  }
}
