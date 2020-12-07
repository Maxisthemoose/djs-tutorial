const readdir = require("readdir-plus");

module.exports = class RegisterEvents {
    dir;
    client;
    constructor(dir, client) {
        this.dir = dir;
        this.client = client;
    }

    init() {
        readdir(this.dir, (err, files) => {
            if (err) throw err;

            for (const file of files) {

                const EventFile = require(file.path);

                const Event = new EventFile();
                
                this.client.on(Event.name, Event.run.bind(null, this.client));
            }
        });
    }
}