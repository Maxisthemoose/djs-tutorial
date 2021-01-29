const BaseCommand = require("../../BaseClasses/BaseCommand");

module.exports = class PlayCard extends BaseCommand {
  constructor() {
    super({
      aliases: ["playcard"],
      description: "Play a card",
      name: "play",
      permissions: ["SEND_MESSAGES"],
      usage: "play",
      category: "general",
    });
  }

  async run(client, message, args) {
    client.discordUNO.playCard(message);
  }
}