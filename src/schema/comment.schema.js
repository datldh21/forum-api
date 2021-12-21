const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
var collectionName = "comment";
const Schema = mongoose.Schema;
var dataSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "user",
    },
    strength: {
        type: String,
    },
    weakness: {
        type: String,
    },
    target: {
        type: String,
    },
    month: {
        type: Number,
    },
    year: {
        type: Number,
    }
});

module.exports = mongoose.model("comment", dataSchema, collectionName);
