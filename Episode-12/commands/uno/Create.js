const BaseCommand = require("../../BaseClasses/BaseCommand");

module.exports = class Create extends BaseCommand {
  constructor() {
    super({
      aliases: ["creategame"],
      description: "Create a new UNO game",
      name: "create",
      permissions: ["SEND_MESSAGES"],
      usage: "create",
      category: "general",
    });
  }

  async run(client, message, args) {
    client.discordUNO.createGame(message);
  }
}