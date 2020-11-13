const Discord = require("discord.js");

const client = new Discord.Client();

const prefix = "!";

client.on("ready", () => {
    console.log("I am now ready to be used!");
});


client.on("message", (message) => {
    const args = message.content.slice(prefix.length).split(" ");
    const command = args.shift();

    switch (command) {
        case "ping": // !ping - responds with Ping? then edits to eg: 780ms
            message.channel.send("Ping?").then((msg) => msg.edit((Date.now() - msg.createdTimestamp) + "ms"));
        break;
    }

});


client.login("token");