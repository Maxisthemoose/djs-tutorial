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

        if (commandFile) commandFile.run(client, message, args);
    }

}