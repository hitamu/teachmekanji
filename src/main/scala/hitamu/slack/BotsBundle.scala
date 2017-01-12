package hitamu.slack

import akka.actor.{ActorContext, ActorRef, Props}
import io.scalac.slack.{BotModules, MessageEventBus}
import io.scalac.slack.bots.system.{CommandsRecognizerBot, HelpBot}
import hitamu.slack.bots.KanjiBot

class BotsBundle() extends BotModules {
  override def registerModules(context: ActorContext, websocketClient: ActorRef) = {
    val eventBus: MessageEventBus = BotRunner.eventBus

    context.actorOf(Props(classOf[KanjiBot], eventBus), "kanjiBot")
  }
}
