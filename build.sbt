name := "teachmekanji"

version := "2.0"

scalaVersion := "2.11.6"

resolvers += "scalac repo" at "https://raw.githubusercontent.com/ScalaConsultants/mvn-repo/master/"

libraryDependencies ++= Seq("io.scalac" %% "slack-scala-bot-core" % "0.2.1")