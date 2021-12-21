const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var collectionName = 'categories';

var dataSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    description: {
        type: String,
    },
    icon: {
        type: String,
    },
    topicCount: {
        type: Number,
    },
    postCount: {
        type: Number,
    },
});

module.exports = mongoose.model('categories', dataSchema, collectionName);
