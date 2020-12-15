module.exports = class BaseCommand {

    name;
    aliases;
    description;
    usage;
    permissions;
    category;

    constructor({ name, aliases, description, usage, permissions, category }) {
        this.name = name;
        this.aliases = aliases;
        this.description = description;
        this.usage = usage;
        this.permissions = permissions;
        this.category = category;
    }

    async run(client, message, args) {};

}