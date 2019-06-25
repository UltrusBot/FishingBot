require('dotenv').config()
const Discord = require('discord.js');
const SQLite = require('better-sqlite3');
const sql = new SQLite('./fishingbot.sqlite');
const client = new Discord.Client();
const prefix = "f!"
const helpEmbed = new Discord.RichEmbed({
  "title": "Fishing Bot Commands!",
  "color": 53380,
  "fields": [{
    "name": "**help**",
    "value": "Shows you this help menu, with all the commands!",
    "inline": true
  }]
});
var currentFishers = {}
/*To create unique version of bot, add a .env file with the line:
TOKEN="YOUR_TOKEN_HERE"
*/
client.on('ready', () => {
  console.log(`Fishing Bot logged in at ${Date.now()}`);
});

client.on('message', msg => {
  if (msg.content.substring(0,  2) != prefix) return;

  let args = msg.content.slice(prefix.length).split(" ");
  let command = args.shift().toLowerCase();
  if (command == "help") {
    msg.channel.send(helpEmbed)
  }
  if (command == "fish") {
    if (currentFishers[msg.author.id]) {
      msg.reply("You are already fishing somewhere!\nUse the command f!quitfish to quit your fishing session!");
    } else {
      msg.reply("You have started fishing!");
      currentFishers[msg.author.id] = (Fisher(msg.author.id, msg.channel.id, 0))
      setTimeout(fishRound, 1000 + (Math.random() * 2000), currentFishers[msg.author.id])
    }
  }
});
function Fisher(id, channel, count) {
  return {id: id, channel: channel, count: count};
}
function fishRound(fishObject) {
  if (fishObject.count > 2) {
    client.channels.get(fishObject.channel).send(`<@${fishObject.id}>, you caught no fish! :(`)
    delete currentFishers[fishObject.id];
    return;
  }
  if (Math.random() >= .80) {
    delete currentFishers[fishObject.id];
    client.channels.get(fishObject.channel).send(`<@${fishObject.id}>, you got a fish!`);
  } else {
    client.channels.get(fishObject.channel).send("...");
    fishObject.count++
    setTimeout(fishRound, 1000 + (Math.random() * 2000), fishObject)
  }
}
client.login(process.env.TOKEN);