const BaseCommand = require("../../BaseClasses/BaseCommand");

module.exports = class UpdateSettings extends BaseCommand {
  constructor() {
    super({
      aliases: ["updatesettings"],
      description: "Update the channels game settings",
      name: "usettings",
      permissions: ["MANAGE_MESSAGES"],
      usage: "usettings",
      category: "general",
    });
  }

  async run(client, message, args) {
    client.discordUNO.updateSettings(message);
  }
}