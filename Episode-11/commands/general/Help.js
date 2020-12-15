const { MessageEmbed } = require("discord.js");
const BaseCommand = require("../../BaseClasses/BaseCommand");
const categories = require("../../utils/categories");
const { prefix } = require("../../config.json");

module.exports = class Help extends BaseCommand {
    constructor() {
        super({
            aliases: ["halp"],
            description: "Help menu for the bot",
            name: "help",
            permissions: ["SEND_MESSAGES"],
            usage: "help",
            category: "general",
        });
    }

    async run(client, message, args) {

        const commands = client.commands.array();
        const emojis = { 0: "1️⃣", 1: "2️⃣", 2: "3️⃣", 3: "4️⃣", 4: "5️⃣", 5: "6️⃣", 6: "7️⃣", 7: "8️⃣", 8: "9️⃣", 9: "🔟" };
        const reactionEmojis = ["↩️", "⬅️", "1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣", "➡️", "❌"];


        const pages = [];

        for (let i = 0; i < categories.length; i += 6) {
            pages.push(categories.slice(i, i + 6));
        }

        const StartEmbed = new MessageEmbed()
            .setAuthor("Help Embed", message.author.displayAvatarURL({ format: "png" }))
            .setColor("RED")
            .setFooter(`Page 1/${pages.length}`);
            
        let page = 0;
        let commandPage = 0;

        // "home" "commands" "command"
        let pageType = "home";

        const initalData = pages[page];

        const mappedInfo = initalData.map((v, i) => [emojis[i], v]);

        for (const info of mappedInfo) {
            StartEmbed.addField(info[1], `Click ${info[0]} to view`);
        }

        const startMessage = await message.channel.send("", { embed: StartEmbed });

        reactionEmojis.forEach(async emoji => await startMessage.react(emoji));

        const filter = (reaction, user) => reactionEmojis.includes(reaction.emoji.name) && user.id === message.author.id;

        const collector = startMessage.createReactionCollector(filter, { time: 1000 * 60 * 5 });

        const history = [];
        let cmdPages = [];


        collector.on("collect", (reaction, user) => {

            switch (reaction.emoji.name) {
                case "↩️":
                    
                    const oldEmbed = history.pop();
                    if (oldEmbed) {
                        if (startMessage.embeds[0].author.name.includes("Command") && oldEmbed.author.name.includes("Embed")) pageType = "home";

                        startMessage.edit("", { embed: oldEmbed });
                    }

                break;
                case "⬅️":

                    if (pageType === "home") {
                        if (page !== 0) page--;
                    } else if (pageType === "commands") {
                        if (commandPage !== 0) commandPage--;
                    }

                break;
                case "1️⃣":
                    handleReactions(0);
                break;
                case "2️⃣":
                    handleReactions(1);
                break;
                case "3️⃣":
                    handleReactions(2);
                break;
                case "4️⃣":
                    handleReactions(3);
                break;
                case "5️⃣":
                    handleReactions(4);
                break;
                case "6️⃣":
                    handleReactions(5);
                break;
                case "➡️":
                    if (pageType === "home") {
                        if (page !== pages.length - 1) page++;
                    } else if (pageType === "commands") {
                        if (commandPage !== cmdPages.length - 1) commandPage++;
                    }
                break;
                case "❌":
                    return collector.stop("Ended By User");
            }

        });

        collector.on("end", (reason) => {

            if (reason === "Ended By User") {

                const endEmbed = new MessageEmbed()
                    .setAuthor(message.author.username, message.author.displayAvatarURL({ format: "png" }))
                    .setColor("RED")
                    .setDescription("Ended by User");
                return startMessage.edit("", { embed: endEmbed });

            } else {
                const endEmbed = new MessageEmbed()
                    .setAuthor(message.author.username, message.author.displayAvatarURL({ format: "png" }))
                    .setColor("RED")
                    .setDescription("Timed Out");
                return startMessage.edit("", { embed: endEmbed });
            }

        });

        function handleReactions(index) {

            const data = pages[page][index];
            if (pageType === "home" && data) {

                cmdPages = [];
                const pageData = commands.filter(c => c.category === data).map(c => c.name);

                const commandEmbed = new MessageEmbed()
                    .setColor("RED")
                    .setAuthor("Command Help", message.author.displayAvatarURL({ format: "png" }));

                for (let i = 0; i < pageData.length; i += 6) {
                    cmdPages.push(pageData.slice(i, i + 6));
                }

                commandEmbed.setFooter(`Page ${commandPage + 1}/${cmdPages.length}`);

                const initialCmdData = cmdPages[commandPage];

                const mappedCommands = initialCmdData.map((v, i) => [emojis[i], v]);

                for (const info of mappedCommands) {
                    commandEmbed.addField(info[1], `Click ${info[0]} to view`);
                }

                pageType = "commands";

                history.push(startMessage.embeds[0]);

                return startMessage.edit("", { embed: commandEmbed });

            } else if (pageType === "commands") {

                const data = cmdPages[commandPage][index];

                if (data) {

                    const command = commands.find(c => c.name === data);

                    const commandEmbed = new MessageEmbed()
                        .setAuthor(`${command.name} Help`, message.author.displayAvatarURL({ format: "png" }))
                        .setColor("RED")
                        .setDescription(
                            `Name: ${command.name}
                            Aliases: ${command.aliases.length < 1 ? "None" : command.aliases.join(", ")}
                            Description: ${command.description}
                            Usage: ${prefix}${command.usage}
                            Permission: ${command.permissions.join(", ")}`
                        );
                    
                    history.push(startMessage.embeds[0]);

                    return startMessage.edit("", { embed: commandEmbed });

                }


            }

        }


    }

}