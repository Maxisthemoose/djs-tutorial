module.exports = class BaseCommand {

    name;
    aliases;
    description;
    usage;
    permissions;

    constructor({ name, aliases, description, usage, permissions }) {
        this.name = name;
        this.aliases = aliases;
        this.description = description;
        this.usage = usage;
        this.permissions = permissions;
    }

    async run(client, message, args) {};

}