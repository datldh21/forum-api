const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
var collectionName = "topic";
const Schema = mongoose.Schema;

var dataSchema = new Schema({
    categoryId: {
        type: Schema.Types.ObjectId,
        ref: "categories",
    },
    icon: {
        type: String
    },
    name: {
        type: String
    },
    startDate: {
        type: Date
    },
    userCreate: {
        type: Schema.Types.ObjectId,
        ref: "user",
    },
    voteCount: {
        type: Number,
    },
    postCount: {
        type: Number,
    },
    viewCount: {
        type: Number,
    },
});

module.exports = mongoose.model("topic", dataSchema, collectionName);
