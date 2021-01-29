const BaseCommand = require("../../BaseClasses/BaseCommand");

module.exports = class Leave extends BaseCommand {
  constructor() {
    super({
      aliases: ["leavegame"],
      description: "Leaves an UNO game",
      name: "leave",
      permissions: ["SEND_MESSAGES"],
      usage: "leave",
      category: "general",
    });
  }

  async run(client, message, args) {
    client.discordUNO.removeUser(message);
  }
}