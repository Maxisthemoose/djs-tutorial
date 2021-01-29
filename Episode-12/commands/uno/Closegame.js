const BaseCommand = require("../../BaseClasses/BaseCommand");

module.exports = class Closegame extends BaseCommand {
  constructor() {
    super({
      aliases: ["closegame"],
      description: "Closes an UNO game",
      name: "close",
      permissions: ["SEND_MESSAGES"],
      usage: "close",
      category: "general",
    });
  }

  async run(client, message, args) {
    client.discordUNO.closeGame(message);
  }
}