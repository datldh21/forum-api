const Category = require("../repositories/category.repository");

exports.create = async (req, res) => {
    const data = req.body;

    if (!data) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    } else {
        Category.create(data, (err, data) => {
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

exports.getOneCategory = async (req, res) => {
    const id = req.params.id;
    if (!id || id.length < 24) {
        res.status(400).send({
            message: "Not found this id!"
        });
    } else {
        Category.getOneCategory(id, (err, data) => {
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

exports.getAllCategory = async (req, res) => {
    Category.getAllCategory((err, data) => {
        if (err) {
            res.status(500).send({
                message: "Some error occurred!"
            })
        } else {
            res.send(data);
        }
    });
}

exports.updateTopicCount = async (req, res) => {
    const id = req.params.id;

    if (!id) {
        res.status(400).send({
            message: "Content can not be empty!",
        });
    } else {
        Category.updateTopicCount(id,  (err, data) => {
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
        Category.increasePostCount(id,  (err, data) => {
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
        Category.decreasePostCount(id,  (err, data) => {
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
        Category.update(id, dataUpdate, (err, data) => {
            if (err) {
                res.status(500).send({
                    message: "Some error occurred!"
                });
            } else {
                res.send(data);
            }
        });
    }
}

exports.delete = async (req, res) => {
    const id = req.params.id;
    if (!id) {
        res.status(400).send({
            message: "Content can not be empty!",
        });
    } else {
        Category.delete(id, (err, data) => {
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