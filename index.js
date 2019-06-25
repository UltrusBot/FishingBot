require('dotenv').config()
const Discord = require('discord.js');
//const sqlite = require("")
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
})
;
/*To create unique version of bot, add a .env file with the line:
TOKEN="YOUR_TOKEN_HERE"
*/
client.on('ready', () => {
  console.log(`Fishing Bot logged in at ${Date.now()}`);
});

client.on('message', msg => {
  if (msg.content.substring(0,  2) != prefix) return;

  let args = msg.content.slice(prefix.length).split(" ");
  let command = args.shift();
  if (command == "help") {
    msg.channel.send(helpEmbed)
  }
});
client.login(process.env.TOKEN);