# TeachMeKanji

## Learn Kanji via Slackbot
This bot integrate with Slack to help Japanese learner have an easier way to study Kanji.

There are two main functions:

* Posting random Kanji words to your public channel in scheduled time (configurable in `config.js`)
* Looking up by meaning, by spelling or detail of each Kanji

Detail Kanji|By spelling|By meaning
:--:|:--:|:--:|
![](http://i.imgur.com/FOKBmaA.png)| ![](http://i.imgur.com/SjwSM3l.png)| ![](http://i.imgur.com/r1BBZ7Y.png)

### Install
Require `npm` already installed

```
git clone https://github.com/hitamu/teachmekanji.git
cd teachmekanji
npm install
npm run build
```
Go to Slack App Integration to [create new app](https://api.slack.com/apps) then copy your token and export it to environment variable
```
export SLACK_TOKEN=xxxxxxxxx
```
On **development**

```
npm start
```

On **production**

```
npm run serve
```

### Data

*English-Japanese*
I used data of [Kanji alive](https://kanjialive.com/) which is a free resource for learning to read and write Kanji.

[TODO] *Vietnamese-Japanese*