const { Schema, model } = require("mongoose");

const TestSchema = new Schema({
    test: { type: String, required: false, default: "Hi There" },
});

module.exports = model("test", TestSchema);