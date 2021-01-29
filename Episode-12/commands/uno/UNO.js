const BaseCommand = require("../../BaseClasses/BaseCommand");

module.exports = class UNO extends BaseCommand {
  constructor() {
    super({
      aliases: ["unocall"],
      description: "Protect yourself from callouts or call someone else out",
      name: "uno",
      permissions: ["SEND_MESSAGES"],
      usage: "uno",
      category: "general",
    });
  }

  async run(client, message, args) {
    client.discordUNO.UNO(message);
  }
}