const BaseEvent = require("../BaseClasses/BaseEvent");

module.exports = class Ready extends BaseEvent {
    constructor() {
        super("ready");
    }

    async run(client) {
        console.log(`${client.user.username} is logged in!`);
    }

}