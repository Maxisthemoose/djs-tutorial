const BaseEvent = require("../BaseClasses/BaseEvent");
const config = require("../config.json");

module.exports = class Message extends BaseEvent {
    constructor() {
        super("message");
    }

    async run(client, message) {
        const args = message.content.slice(config.prefix.length).split(" ");
        const command = args.shift();


        const commandFile = client.commands.get(command) || client.commands.get(client.aliases.get(command));

        if (commandFile) {

            const permissions = commandFile.permissions;

            for (const permission of permissions) {
                if (!message.member.permissions.has(permission)) return message.channel.send("You do not have permission to use that command");
            }

            commandFile.run(client, message, args);
        }
    }

}