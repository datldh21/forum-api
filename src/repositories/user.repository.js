const { ObjectId } = require('bson');
const Jwt = require('jsonwebtoken');
const userSchema = require('../schema/user.schema');
const { response } = require('../utils/response');
const password = require('secure-random-password');

// constructor
const User = function (user) {
    this.email = user.email;
    this.password = user.password;
};

User.resetPassword = async (user, result) => {
    const queryCheck = await userSchema.find({ email: user.email });
    const newPassWord = password.randomString({ length: 12 });
    if (queryCheck.length == 0) {
        const newUser = new userSchema({
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            role: user.role,
            password: newPassWord,
        });
        const queryUser = await newUser.save();
        result(null, { response: queryUser, success: true, errorCode: 0 });
    } else {
        const data = {
            email: user.email,
            password: newPassWord,
        };
        const queryfind = await userSchema.updateOne(user, data);
        result(null, { response: data, success: true, errorCode: 0 });
    }
};

User.login = async (user, result) => {
    const queryLogin = await userSchema.find(user);
    response(queryLogin, result);
};

User.getInfo = async (id, result) => {
    const agg = [
        {
            $match: {
                _id: new ObjectId(id)
            },
        },
        {
            $project: {
                userName: 1,
                fullName: 1,
                gender: 1,
                joinDate: 1,
                avatar: 1,
                birthday: 1,
                role: 1,
                aboutMe: 1,
                notice: 1,
                banned: 1,
            },
        }
    ];

    const queryfind = await userSchema.aggregate(agg);
    response(queryfind, result);
};

User.getInfoTotal = async (result) => {
    const agg =[
        {
            $project: {
                userName: 1,
                fullName: 1,
                gender: 1,
                startDate: 1,
                avatar: 1,
                role: 1,
            },
        }
    ]
    const queryfind = await userSchema.aggregate(agg);
    result(null, queryfind);
};

User.update = async (id, dataUpdate, result) => {
    const filter = { _id: new ObjectId(id) };
    const query = await userSchema.updateOne(filter, { $set: dataUpdate }, { multi: true });
    result (null, {
        response: query,
    });
};

User.createUser = (user, result) => {};

module.exports = User;