const BaseCommand = require("../../BaseClasses/BaseCommand");

module.exports = class ViewCards extends BaseCommand {
  constructor() {
    super({
      aliases: ["viewcards"],
      description: "View your current hand.",
      name: "hand",
      permissions: ["SEND_MESSAGES"],
      usage: "hand",
      category: "general",
    });
  }

  async run(client, message, args) {
    client.discordUNO.viewCards(message);
  }
}