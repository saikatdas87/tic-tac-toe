package models

import play.api.libs.json.{Json, OFormat}

case class Board(
                  value: String = "",
                  position: Int
                )

object Board {
  implicit val productFormat: OFormat[Board] = Json.format[Board]

  def apply(value: String, position: Int): Board = new Board(value, position)
}
