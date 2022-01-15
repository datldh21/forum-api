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

exports.createUser = async (req, res) => {
    const data = req.body;

    if (!data) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    } else {
        User.createUser(data, (err, data) => {
            if (err) {
                res.status(500).send({
                    message: "Some error occurred!"
                })
            } else {
                res.send(data);
            }
        });
    }
}

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

exports.update = async (req, res) => {
    const id = req.params.id;
    if (!id || !req.body) {
        res.status(400).send({
            message: 'Content can not be empty!',
        });
    } else {
        const user = req.body;

        User.update(id, user, (err, data) => {
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