const BaseCommand = require("../../BaseClasses/BaseCommand");

module.exports = class ViewTable extends BaseCommand {
  constructor() {
    super({
      aliases: ["viewtable"],
      description: "View the current table",
      name: "table",
      permissions: ["SEND_MESSAGES"],
      usage: "table",
      category: "general",
    });
  }

  async run(client, message, args) {
    client.discordUNO.viewTable(message);
  }
}