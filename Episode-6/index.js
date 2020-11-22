const Discord = require("discord.js");

const client = new Discord.Client();

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();

const RegisterCommands = require("./registry/RegisterCommands");

const registerCmds = new RegisterCommands("./commands", ["general"], client);
registerCmds.init();

const RegisterEvents = require("./registry/RegisterEvents");

const registerEvents = new RegisterEvents("./events", client);
registerEvents.init();


client.login(config.token);