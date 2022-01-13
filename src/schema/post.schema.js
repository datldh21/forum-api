const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
var collectionName = "post";
const Schema = mongoose.Schema;

var dataSchema = new Schema({
    categoryId: {
        type: Schema.Types.ObjectId,
        ref: "category"
    },
    topicId: {
        type: Schema.Types.ObjectId,
        ref: "topic",
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "user",
    },
    content: {
        type: String,
    },
    votes: {
        type: Number,
    },
    date: {
        type: Date,
    }
});

module.exports = mongoose.model("post", dataSchema, collectionName);
