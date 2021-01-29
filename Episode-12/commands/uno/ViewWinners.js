const BaseCommand = require("../../BaseClasses/BaseCommand");

module.exports = class ViewWinners extends BaseCommand {
  constructor() {
    super({
      aliases: ["viewwinners"],
      description: "View who has won the current game, if anyone has.",
      name: "winners",
      permissions: ["SEND_MESSAGES"],
      usage: "winners",
      category: "general",
    });
  }

  async run(client, message, args) {
    client.discordUNO.viewWinners(message);
  }
}