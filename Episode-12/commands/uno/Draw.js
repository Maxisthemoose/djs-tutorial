const BaseCommand = require("../../BaseClasses/BaseCommand");

module.exports = class Draw extends BaseCommand {
  constructor() {
    super({
      aliases: ["drawcard"],
      description: "Draws a card from the deck",
      name: "draw",
      permissions: ["SEND_MESSAGES"],
      usage: "draw",
      category: "general",
    });
  }

  async run(client, message, args) {
    client.discordUNO.draw(message);
  }
}