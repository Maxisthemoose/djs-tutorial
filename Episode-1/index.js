const Discord = require("discord.js");

const client = new Discord.Client();

client.on("ready", () => {
    console.log("I am now ready to be used!");
});


client.on("message", (message) => {
    if (message.content === "hello")
        message.reply("Hello there!");
});


client.login("token");