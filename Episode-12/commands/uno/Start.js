const BaseCommand = require("../../BaseClasses/BaseCommand");

module.exports = class Start extends BaseCommand {
  constructor() {
    super({
      aliases: ["startgame"],
      description: "Starts an UNO game",
      name: "start",
      permissions: ["SEND_MESSAGES"],
      usage: "start",
      category: "general",
    });
  }

  async run(client, message, args) {
    client.discordUNO.startGame(message);
  }
}