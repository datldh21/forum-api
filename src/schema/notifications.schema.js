const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
var collectionName = "notifications";
const Schema = mongoose.Schema;

var dataSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "user",
    },
    topicId: {
        type: Schema.Types.ObjectId,
        ref: "topic",
    },
    userCreateId: {
        type: Schema.Types.ObjectId,
        ref: "user",
    },
    date: {
        type: Date,
    }
});

module.exports = mongoose.model("notifications", dataSchema, collectionName);
