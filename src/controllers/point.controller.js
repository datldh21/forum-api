const Point = require("../repositories/point.repository");

exports.getHistoryPointUser = async (req, res) => {
    res.header("Access-Control-Allow-Origin");
    const id = req.params;
    if (!id) {
        res.status(400).send({
            message: "Not found id!",
        });
    }
    Point.getHistoryPointUser(id, (err, data) => {
        if (err)
            res.status(500).send({
                message: "Some error occurred while creating the Customer.",
            });
        else {
            if (data.success) {
                const response = data.response.map((item) => {
                    return {
                        _id: item._id,
                        point: item.point,
                        userId: item.userId,
                        authorId: item.authorId,
                        reason: item.reason,
                        hide: item.hide,
                        seen: item.seen,
                        date: item.date,
                        firstName: item.user[0].firstName,
                        lastName: item.user[0].lastName,
                        avatar: item.user[0].avatar,
                        position: item.user[0].position,
                        firstNameAuthor: item.author[0].firstName,
                        lastNameAuthor: item.author[0].lastName,
                        avatarAuthor: item.author[0].avatar,
                        positionAuthor: item.author[0].position,
                    };
                });

                res.send({ response, success: data.success, errorCode: data.errorCode });
            } else {
                res.send(data);
            }
        }
    });
};

exports.getListHistoryPoint = async (req, res) => {
    res.header("Access-Control-Allow-Origin");
    Point.getListHistoryPoint((err, data) => {
        if (err) {
            res.status(500).send({
                message: "Some error occurred while creating the Customer.",
            });
        } else {
            if (data.success) {
                const response = data.response.map((item) => {
                    return {
                        _id: item._id,
                        point: item.point,
                        userId: item.userId,
                        authorId: item.authorId,
                        reason: item.reason,
                        hide: item.hide,
                        seen: item.seen,
                        date: item.date,
                        firstName: item.user[0].firstName,
                        lastName: item.user[0].lastName,
                        position: item.user[0].position,
                        avatar: item.user[0].avatar,
                        firstNameAuthor: item.author[0].firstName,
                        lastNameAuthor: item.author[0].lastName,
                        positionAuthor: item.author[0].position,
                        avatarAuthor: item.author[0].avatar,
                    };
                });
                res.send({ response, success: data.success, errorCode: data.errorCode });
            } else {
                res.send(data);
            }
        }
    });
};

exports.weeklyRankings = async (req, res) => {
    res.header("Access-Control-Allow-Origin");
    Point.weeklyRankings((err, data) => {
        if (err) {
            res.status(500).send({
                message: "Some error occurred.",
            });
        } else {
            if (data.success) {
                const response = data.response.map((item) => {
                    return {
                        point: item.point,
                        reason: item.reason,
                        userId: item._id,
                        firstName: item.user[0].firstName,
                        lastName: item.user[0].lastName,
                        position: item.user[0].position,
                        avatar: item.user[0].avatar,
                    };
                });
                res.send({ response, success: data.success, errorCode: data.errorCode });
            } else {
                res.send(data);
            }
        }
    });
};

exports.monthlyRankings = async (req, res) => {
    res.header("Access-Control-Allow-Origin");

    Point.monthlyRankings((err, data) => {
        if (err)
            res.status(500).send({
                message: "Some error occurred while creating the Customer.",
            });
        else {
            if (data.success) {
                const response = data.response.map((item) => {
                    return {
                        point: item.point,
                        userId: item._id,
                        firstName: item.user[0].firstName,
                        lastName: item.user[0].lastName,
                        position: item.user[0].position,
                        avatar: item.user[0].avatar,
                    };
                });
                res.send({ response, success: data.success, errorCode: data.errorCode });
            } else {
                res.send(data);
            }
        }
    });
};

exports.rankings = async (req, res) => {
    Point.rankings((err, data) => {
        if (err)
            res.status(500).send({
                message: "Some error occurred while creating the Customer.",
            });
        else {
            if (data.success) {
                const response = data.response.map((item) => {
                    return {
                        _id: item._id,
                        point: item.point,
                        firstName: item.firstName,
                        lastName: item.lastName,
                        position: item.position,
                        avatar: item.avatar,
                        teams: item.teams,
                        role: item.role,
                    };
                });
                res.send({ response, success: data.success, errorCode: data.errorCode });
            } else {
                res.send(data);
            }
        }
    });
};
exports.create = async (req, res) => {
    res.header("Access-Control-Allow-Origin");
    const data = req.body;
    const hide = data.hide ? data.hide : false;

    if (!data) {
        res.status(400).send({
            message: "Content can not be empty!",
        });
    } else {
        // const newPoint = new Point(data);
        Point.create(data, (err, data) => {
            if (err)
                res.status(500).send({
                    message: "Some error occurred.",
                });
            else {
                res.send(data);
            }
        });
    }
};

exports.updateSeenNotifications = async (req, res) => {
    res.header("Access-Control-Allow-Origin");
    const data = req.body;
    const userId = req.params.id;

    if (!userId || !req.body) {
        res.status(400).send({
            message: "Content can not be empty!",
        });
    } else {
        Point.updateSeenNotifications(userId, data, (error, data) => {
            if (error)
                res.status(500).send({
                    error,
                });
            else {
                res.status(200).send(data);
            }
        });
    }
};

exports.update = async (req, res) => {
    res.header("Access-Control-Allow-Origin");
    const pointId = req.params.id;
    const data = req.body;

    if (!pointId || !req.body) {
        res.status(400).send({
            message: "Content can not be empty!",
        });
    } else {
        Point.update(pointId, data, (error, data) => {
            if (error)
                res.status(500).send({
                    error,
                });
            else {
                res.status(200).send(data);
            }
        });
    }
};
exports.delete = async (req, res) => {
    res.header("Access-Control-Allow-Origin");
    const id = req.params.id;
    if (!id) {
        res.status(400).send({
            message: "Content can not be empty!",
        });
    } else {
        Point.delete(id, (err, data) => {
            if (err)
                res.status(500).send({
                    message: "Some error occurred while creating the Customer.",
                });
            else {
                res.send(data);
            }
        });
    }
};
exports.notification = async (req, res) => {
    const userId = req.params.userId;
    if (!userId) {
        res.status(400).send({
            message: "Content can not be empty!",
        });
    } else {
        Point.notification(userId, (err, data) => {
            if (err)
                res.status(500).send({
                    message: "Some error occurred ",
                });
            else {
                res.send(data);
            }
        });
    }
};
