package hitamu.slack.bots

import io.scalac.slack.MessageEventBus
import io.scalac.slack.bots.AbstractBot
import io.scalac.slack.common.{BaseMessage, Command, OutboundMessage}

class KanjiBot(override val bus: MessageEventBus) extends AbstractBot {
  override def help(channel: String): OutboundMessage =
    OutboundMessage(channel, "this is help text")

  override def act: Receive = {
    case BaseMessage(text, channel, user, _, _) => publish(OutboundMessage(channel, text))
  }
}

