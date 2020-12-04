const Discord = require("discord.js");
require("./database/database");


const client = new Discord.Client({
    ws: {
        intents: Discord.Intents.ALL
    }
});

const config = require("./config.json");

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();

const RegisterCommands = require("./registry/RegisterCommands");

const registerCmds = new RegisterCommands("./commands", ["general", "games"], client);
registerCmds.init();

const RegisterEvents = require("./registry/RegisterEvents");

const registerEvents = new RegisterEvents("./events", client);
registerEvents.init();


client.login(config.token);