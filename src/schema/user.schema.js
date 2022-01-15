const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var collectionName = 'user';

var dataSchema = new mongoose.Schema({
    userName: {
        type: String,
    },
    fullName: {
        type: String,
    },
    gender: {
        type: String,
    },
    joinDate: {
        type: Date,
    },
    birthday: {
        type: Date,
    },
    avatar: {
        type: String,
    },
    email: {
        type: String,
    },
    password: {
        type: String,
    },
    role: {
        type: String,
    },
    aboutMe: {
        type: String,
    }, 
    notice: {
        type: Boolean,
    },
    banned: {
        type: Boolean,
    }
});

module.exports = mongoose.model('user', dataSchema, collectionName);
