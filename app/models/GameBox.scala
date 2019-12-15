package models

import play.api.libs.json.{Json, OFormat}

case class GameBox(
                  value: String = "",
                  position: Int
                )

object GameBox {
  implicit val productFormat: OFormat[GameBox] = Json.format[GameBox]

  def apply(value: String, position: Int): GameBox = new GameBox(value, position)
}
