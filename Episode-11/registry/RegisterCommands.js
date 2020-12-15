const readdir = require("readdir-plus");

module.exports = class Register {
    
    mainDir;
    subFolders;
    client;
    constructor(mainDir, subFolders, client) {
        this.client = client;
        this.subFolders = subFolders;
        this.mainDir = mainDir;
    }


    init() {
        for (const folder of this.subFolders) {
            readdir(`${this.mainDir}/${folder}`, (err, files) => {

                if (err) throw err;

                for (const file of files) {

                    const CommandFile = require(file.path);

                    const Command = new CommandFile();

                    this.client.commands.set(Command.name, Command);

                    for (const alias of Command.aliases) {
                        this.client.aliases.set(alias, Command.name);
                    }
                }
            });
        }
    }
}