const Topic = require("../repositories/topic.repository");

exports.create = async (req, res) => {
    const data = req.body;

    if (!data) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    } else {
        Topic.create(data, (err, data) => {
            if (err) {
                res.status(500).send({
                    message: "Some error occurred!"
                })
            } else {
                res.send({ response: data, success: true, errorCode: 0 });
            }
        });
    }
}

exports.getRecentTopic = async (req, res) => {
    Topic.getRecentTopic((err, data) => {
        if (err) {
            res.status(500).send({
                message: "Some error occurred!"
            })
        } else {
            res.send(data);
        }
    })
}

exports.getPopularTopic = async (req, res) => {
    Topic.getPopularTopic((err, data) => {
        if (err) {
            res.status(500).send({
                message: "Some error occurred!"
            })
        } else {
            res.send(data);
        }
    })
}

exports.getOneTopic = async (req, res) => {
    const id = req.params.id;
    if (!id || id.length < 24) {
        res.status(400).send({
            message: "Not found this id!"
        });
    } else {
        Topic.getOneTopic(id, (err, data) => {
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

exports.getCategoryTopic = async (req, res) => {
    const id = req.params.id;
    if (!id || id.length < 24) {
        res.status(400).send({
            message: "Not found this id!"
        });
    } else {
        Topic.getCategoryTopic(id, (err,data) => {
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

exports.updateViewCount = async (req, res) => {
    const id = req.params.id;
    
    if (!id) {
        res.status(400).send({
            message: "Content can not be empty!",
        });
    } else {
        Topic.updateViewCount(id, (err, data) => {
            if (err) {
                res.status(500).send({
                    message: "Some error occurred!"
                });
            } else {
                res.status(200).send(data);
            }
        });
    }
}

exports.increasePostCount = async (req, res) => {
    const id = req.params.id;
    
    if (!id) {
        res.status(400).send({
            message: "Content can not be empty!",
        });
    } else {
        Topic.increasePostCount(id, (err, data) => {
            if (err) {
                res.status(500).send({
                    message: "Some error occurred!"
                });
            } else {
                res.status(200).send(data);
            }
        });
    }
}

exports.decreasePostCount = async (req, res) => {
    const id = req.params.id;
    
    if (!id) {
        res.status(400).send({
            message: "Content can not be empty!",
        });
    } else {
        Topic.decreasePostCount(id, (err, data) => {
            if (err) {
                res.status(500).send({
                    message: "Some error occurred!"
                });
            } else {
                res.status(200).send(data);
            }
        });
    }
}

exports.increaseVotes = async (req, res) => {
    const id = req.params.id;
    
    if (!id) {
        res.status(400).send({
            message: "Content can not be empty!",
        });
    } else {
        Topic.increaseVotes(id, (err, data) => {
            if (err) {
                res.status(500).send({
                    message: "Some error occurred!"
                });
            } else {
                res.status(200).send(data);
            }
        });
    }
}

exports.decreaseVotes = async (req, res) => {
    const id = req.params.id;
    
    if (!id) {
        res.status(400).send({
            message: "Content can not be empty!",
        });
    } else {
        Topic.decreaseVotes(id, (err, data) => {
            if (err) {
                res.status(500).send({
                    message: "Some error occurred!"
                });
            } else {
                res.status(200).send(data);
            }
        });
    }
}

exports.update = async (req, res) => {
    const id = req.params.id;
    const dataUpdate = req.body;

    if (!id || !dataUpdate) {
        res.status(400).send({
            message: "Content can not be empty!",
        });
    } else {
        Topic.update(id, dataUpdate, (err, data) => {
            if (err) {
                res.status(500).send({
                    message: "Some error occurred!"
                });
            } else {
                res.send(data);
            }
        })
    }
}

exports.delete = async (req, res) => {
    const id = req.params.id;
    if (!id) {
        res.status(400).send({
            message: "Content can not be empty!",
        });
    } else {
        Topic.delete(id, (err, data) => {
            if (err)
                res.status(500).send({
                    message: "Some error occurred while creating the Customer.",
                });
            else {
                res.send(data);
            }
        });
    }
}