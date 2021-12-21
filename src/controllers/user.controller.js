const User = require('../repositories/user.repository');
const userSchema = require("../schema/user.schema");
const { ObjectId, ISODate } = require("bson");
const axios = require('axios');

exports.login = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    if (!email || !password) {
        res.status(400).send({
            message: 'Content can not be empty!',
        });
    } else {
        const user = new User({
            email: email,
            password: password,
        });
        User.login(user, (err, data) => {
            if (err)
                res.status(500).send({
                    message: 'Some error occurred while creating the Customer.',
                });
            else {
                res.send(data);
            }
        });
    }
};

exports.getInfo = async (req, res) => {
    const id = req.params.id;

    if (!id || id.length < 24) {
        res.status(500).send({
            message: 'Argument passed in must be a single String of 12 bytes or a string of 24 hex characters',
        });
    } else {
        User.getInfo(id, (err, data) => {
            if (err)
                res.status(500).send({
                    message: 'Some error occurred while creating the Customer.',
                });
            else {
                res.send(data);
            }
        });
    }
};

exports.getInfoTotal = async (req, res) => {
    User.getInfoTotal((err, data) => {
        if (err)
            res.status(500).send({
                message: 'not get information',
            });
        else {
            res.send({ response: data, success: true, errorCode: 0 });
        }
    });
};

exports.updateInfo = async (req, res) => {
    const id = req.params.id;
    if (!id || !req.body) {
        res.status(400).send({
            message: 'Content can not be empty!',
        });
    } else {
        // const point = req.body.point;
        const user = req.body;

        User.updateUser(id, user, (err, data) => {
            if (err)
                res.status(500).send({
                    message: 'Some error occurred while update user.',
                });
            else {
                res.send(data);
            }
        });
    }
}

exports.resetPassword = async (req, res) => {
    const email = req.body.email;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const role = req.body.role;

    if (!email) {
        res.status(400).send({
            message: 'Content can not be empty!',
        });
    }

    const user = {
        email: email,
    };
    User.resetPassword(user, (err, data) => {
        if (err)
            res.status(500).send({
                message: 'Some error occurred while creating the Customer.',
            });
        else {
            res.send(data);
        }
    });
}

exports.getAllDayoffs = async (req, res) => {
    let dayoffs;
    if (req.query.date && req.query.approved) {
        dayoffs = await dayoffsSchema.find({date: new Date(req.query.date), approved: true});
    } else {
        dayoffs = await dayoffsSchema.find({});
    }
    dayoffs = dayoffs.map(r => r.toObject());
    for (let i = 0; i < dayoffs.length; i++) {
        user = await userSchema.find({_id: new ObjectId(dayoffs[i].userId)});
        dayoffs[i]['user'] = user[0];
    }
    res.json(dayoffs);
};

exports.createOrUpdateDayoffs = async (req, res) => {
    const requests = req.body;
    requests.forEach(async(request) => {
        const user = await userSchema.findOne({_id: new ObjectId(request.userId)});
        if (user !== null) {
            const newRequest = await dayoffsSchema.updateOne({_id: new ObjectId(request._id)}, request, {upsert: true});
            if (await dayoffsSchema.find({_id: new ObjectId(request._id)}).count() === 0) {
                const d = new Date(request.date);
                d.setHours(d.getHours() + 7);
                const requestDate = d.getDate() + '/' + (d.getMonth() + 1) + '/' + d.getFullYear();
                const newRequestId = newRequest.upserted[0]._id;
                const directManager = await userSchema.findOne({_id: user.directManagerID});
                await axios.post(DISCORD_BOT_URL + '/api/notification/outoffice', {
                    "channel": "test-bot",
                    "username": user.firstName + ' ' + user.lastName,
                    "date": requestDate,
                    "slot": request.slot,
                    "reason": request.reason,
                    "type": 'dayoff',
                    "requestID": newRequestId,
                    "directManagerDiscordID": directManager !== null ? directManager.discordID : null,
                });
            }
        }
    });
    res.json(requests);
};

exports.getAllWfhs = async(req, res) => {
    const filters = {};
    if (req.query.date) {
        filters['date'] = new Date(req.query.date);
    }
    if (req.query.approved) {
        filters['approved'] = true;
    }
    if (req.query.userID) {
        console.log(req.query.userID);
        filters['userId'] = new ObjectId(req.query.userID);
    }
    console.log(filters);
    let wfhs = await wfhSchema.find(filters);
    wfhs = wfhs.map(r => r.toObject());
    for (let i = 0; i < wfhs.length; i++) {
        user = await userSchema.find({_id: new ObjectId(wfhs[i].userId)});
        wfhs[i]['user'] = user[0];
    }
    res.json(wfhs);
};

exports.createOrUpdateWfhs = async (req, res) => {
    const requests = req.body;
    requests.forEach(async(request) => {
        const user = await userSchema.findOne({_id: new ObjectId(request.userId)});
        if (user !== null) {
            const newRequest = await wfhSchema.updateOne({_id: new ObjectId(request._id)}, request, {upsert: true});
            if (await wfhSchema.find({_id: new ObjectId(request._id)}).count() === 0) {
                const d = new Date(request.date);
                d.setHours(d.getHours() + 7);
                const requestDate = d.getDate() + '/' + (d.getMonth() + 1) + '/' + d.getFullYear();
                const newRequestId = newRequest.upserted[0]._id;
                const directManager = await userSchema.findOne({_id: user.directManagerID});
                await axios.post(DISCORD_BOT_URL + '/api/notification/outoffice', {
                    "channel": "test-bot",
                    "username": user.firstName + ' ' + user.lastName,
                    "date": requestDate,
                    "slot": request.slot,
                    "reason": request.reason,
                    "type": 'wfh',
                    "requestID": newRequestId,
                    "directManagerDiscordID": directManager !== null ? directManager.discordID : null,
                });
            }
        }
    });
    res.json(requests);
};

exports.saveCredit = async (req, res) => {
    User.saveCredit((err, data) => {
        if (err)
            res.status(500).send({
                message: 'Some error occurred while creating the Customer.',
            });
        else {
            res.send(data);
        }
    });
};

exports.resetMonthlyPoint = async (req, res) => {
    User.resetMonthlyPoint((err, data) => {
        if (err)
            res.status(500).send({
                message: 'Some error occurred while creating the Customer.',
            });
        else {
            res.send(data);
        }
    });
};