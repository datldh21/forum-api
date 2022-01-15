const Notifications = require("../repositories/notifications.repository");

exports.create = async (req, res) => {
    const data = req.body;

    if (!data) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    } else {
        Notifications.create(data, (err, data) => {
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

exports.getUserNotifications = async (req, res) => {
    const id = req.params.id;
    if (!id || id.length < 24) {
        res.status(400).send({
            message: "Not found this id!"
        });
    } else {
        Notifications.getUserNotifications(id, (err, data) => {
            if (err) {
                res.status(500).send({
                    message: "Some error occurred!"
                })
            } else {
                res.send(data);
            }
        })
    }
}

