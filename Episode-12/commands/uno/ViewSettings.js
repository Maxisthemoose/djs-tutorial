const BaseCommand = require("../../BaseClasses/BaseCommand");

module.exports = class ViewSettings extends BaseCommand {
  constructor() {
    super({
      aliases: ["viewsettings"],
      description: "View the current settings",
      name: "settings",
      permissions: ["SEND_MESSAGES"],
      usage: "settings",
      category: "general",
    });
  }

  async run(client, message, args) {
    client.discordUNO.viewSettings(message);
  }
}