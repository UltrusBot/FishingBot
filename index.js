require('dotenv').config()
const Discord = require('discord.js');
const client = new Discord.Client();
/*To create unique version of bot, add a .env file with the line:
TOKEN="YOUR_TOKEN_HERE"
*/
client.on('ready', () => {
  console.log(`Fishing Bot logged in at ${Date.now()}`);
});

client.on('message', msg => {

});
client.login(process.env.TOKEN);