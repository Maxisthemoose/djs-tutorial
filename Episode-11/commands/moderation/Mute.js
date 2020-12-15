const BaseCommand = require("../../BaseClasses/BaseCommand");
const Guild = require("../../database/Schemas/Guild");


module.exports = class Mute extends BaseCommand {
    constructor() {
        super({
            aliases: ["muteuser"],
            description: "Mute a user",
            name: "mute",
            permissions: ["MANAGE_ROLES"],
            usage: "mute <user>",
            category: "moderation",
        });
    }



    async run(client, message, args) {

        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

        if (!member) return message.channel.send("Please mention a valid member");

        let guild = await Guild.findOne({ guildId: message.guild.id });
        if (!guild) guild = await Guild.create({ guildId: message.guild.id });

        let muteRole = message.guild.roles.cache.find(r => r.name === "Muted");

        if (!muteRole) {
            muteRole = await message.guild.roles.create({
                data: {
                    name: "Muted",
                    color: "#000000",
                    permissions: [],
                }
            });
        }

        guild.muteRole = muteRole.id;

        
        guild.mutedUsers.push({
            uId: member.id,
            oldRoles: member.roles.cache.map(r => r.id),
        });

        for (const role of member.roles.cache.array().filter(r => r.id !== message.guild.id)) {
            member.roles.remove(role.id);
        }

        member.roles.add(muteRole.id);


        try {
            await guild.updateOne(guild);
        } catch (err) {
            return message.channel.send("Something went wrong while updating the database.");
        }


        return message.channel.send(`${member.user.tag} was successfully muted`);


    }

}