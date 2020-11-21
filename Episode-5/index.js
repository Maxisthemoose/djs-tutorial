const Discord = require("discord.js");

const client = new Discord.Client();

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();

const config = require("./config.json");
const RegisterCommands = require("./registry/RegisterCommands");

const registerCmds = new RegisterCommands("./commands", ["general"], client);
registerCmds.init();



client.on("ready", () => {
    console.log("I am now ready to be used!");
});


client.on("message", (message) => {
    const args = message.content.slice(config.prefix.length).split(" ");
    const command = args.shift();


    const commandFile = client.commands.get(command) || client.commands.get(client.aliases.get(command));

    if (commandFile) commandFile.run(client, message, args);


    // switch (command) {
    //     case "ping": // !ping - responds with Ping? then edits to eg: 780ms
    //         message.channel.send("Ping?").then((msg) => msg.edit((Date.now() - msg.createdTimestamp) + "ms"));
    //     break;
    //     case "say": // !say Hello World! -> Hello World!
    //         const response = args.join(" "); // !say Hello There! -> ["Hello", "There!"] -> "Hello There!"
    //         message.channel.send(response);
    //     break;
    //     case "pinguser": // !pinguser @That Duck Max @Other Person -> @That Duck Max
    //         const mention = message.mentions.members.first();
    //         message.channel.send(`${mention}`);
    //     break;
    // }

});


client.login(config.token);