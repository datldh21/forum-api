const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
var collectionName = "item";

var dataSchema = new mongoose.Schema({
    item: {
        type: String,
    },
    description: {
        type: String,
    },
    price: {
        type: Number,
    },
    date: {
        type: Date,
    },
    quantity: {
        type: Number,
    },
    limited: {
        type: Boolean,
    },
});

module.exports = mongoose.model("item", dataSchema, collectionName);
