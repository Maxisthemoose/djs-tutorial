const BaseCommand = require("../../BaseClasses/BaseCommand");


module.exports = class Test extends BaseCommand {
    constructor() {
        super({
            aliases: ["test"],
            description: "Testing Command",
            name: "test",
            permissions: ["SEND_MESSAGES"],
            usage: "ping",
            category: "general",
        });
    }

    async run(client, message, args) {

        // const Test = await TestSchema.create({ test: "This is a test" });

        // Test.test = "Some new value";

        // await Test.updateOne(Test);


    }

}