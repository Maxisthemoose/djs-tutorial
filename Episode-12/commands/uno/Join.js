const BaseCommand = require("../../BaseClasses/BaseCommand");

module.exports = class Join extends BaseCommand {
  constructor() {
    super({
      aliases: ["joingame"],
      description: "Join an UNO game",
      name: "join",
      permissions: ["SEND_MESSAGES"],
      usage: "join",
      category: "general",
    });
  }

  async run(client, message, args) {
    client.discordUNO.addUser(message);
  }
}