const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
var collectionName = "post";
const Schema = mongoose.Schema;

var dataSchema = new Schema({
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
    upvotes: {
        type: Number,
    },
    downvotes: {
        type: Number,
    },
    date: {
        type: Date,
    }
});

module.exports = mongoose.model("post", dataSchema, collectionName);
