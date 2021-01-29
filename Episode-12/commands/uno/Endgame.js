const BaseCommand = require("../../BaseClasses/BaseCommand");

module.exports = class Endgame extends BaseCommand {
  constructor() {
    super({
      aliases: ["endgame"],
      description: "Ends an UNO game",
      name: "end",
      permissions: ["SEND_MESSAGES"],
      usage: "end",
      category: "general",
    });
  }

  async run(client, message, args) {
    client.discordUNO.endGame(message);
  }
}