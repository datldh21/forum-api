const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var collectionName = 'history_point';
const Schema = mongoose.Schema;
var dataSchema = new Schema({
    point: {
        type: Number,
    },
    authorId: {
        type: Schema.Types.ObjectId,
        ref: 'user',
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'user',
    },
    seen: {
        type: Boolean,
    },
    date: {
        type: Date,
    },
    reason: {
        type: String,
    },
    hide: {
        type: Boolean,
    },
});

module.exports = mongoose.model('history_point', dataSchema, collectionName);
