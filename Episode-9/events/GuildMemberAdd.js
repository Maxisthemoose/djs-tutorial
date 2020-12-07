const BaseEvent = require("../BaseClasses/BaseEvent");
const Guild = require("../database/Schemas/Guild");

module.exports = class GuildMemberAdd extends BaseEvent {
    constructor() {
        super("guildMemberAdd");
    }

    async run(client, member) {

        let guild = await Guild.findOne({ guildId: member.guild.id });
        if (!guild) guild = await Guild.create({ guildId: member.guild.id });

        if (guild.muteRole !== "") {
            if (guild.mutedUsers.some(d => d.uId === member.id)) member.roles.add(guild.muteRole);
        }

    }

}