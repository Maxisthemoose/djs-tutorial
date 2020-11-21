const BaseCommand = require("../../BaseClasses/BaseCommand");

module.exports = class Ping extends BaseCommand {
    constructor() {
        super({
            aliases: ["pong"],
            description: "Check the bots latency",
            name: "ping",
            permissions: ["SEND_MESSAGES"],
            usage: "ping"
        });
    }

    async run(client, message, args) {

        message.channel.send("Pong.");

    }

}