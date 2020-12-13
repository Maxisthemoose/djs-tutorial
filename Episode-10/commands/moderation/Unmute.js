const BaseCommand = require("../../BaseClasses/BaseCommand");
const Guild = require("../../database/Schemas/Guild");

module.exports = class Unmute extends BaseCommand {
    constructor() {
        super({
            aliases: ["unmuteuser"],
            description: "Unmute a user",
            name: "unmute",
            permissions: ["MANAGE_ROLES"],
            usage: "unmute <user>",
            category: "moderation",
        });
    }
    async run(client, message, args) {

        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

        if (!member) return message.channel.send("Please mention a valid member");

        let guild = await Guild.findOne({ guildId: message.guild.id });
        if (!guild) guild = await Guild.create({ guildId: message.guild.id });

        if (guild.mutedUsers.find(u => u.uId === member.id)) {

            const dbMember = guild.mutedUsers.find(u => u.uId === member.id);

            for (const roleId of dbMember.oldRoles) {
                if (roleId !== message.guild.id) {
                    member.roles.add(roleId);
                }
            }

            member.roles.remove(guild.muteRole);

            guild.mutedUsers.splice(guild.mutedUsers.findIndex(u => u.uId === member.id), 1);

            try {
                await guild.updateOne(guild);
            } catch (err) {
                return message.channel.send("Something went wrong while unmuting that user");
            }

            return message.channel.send(`Successfully unmuted ${member.user.tag}`);


        } else return message.channel.send("That member is not muted");

    }
}