const Post = require('../repositories/post.repository');

exports.create = async (req, res) => {
    const data = req.body;

    if (!data) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    } else {
        Post.create(data, (err, data) => {
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

exports.getAllPosts = async (req, res) => {
    Post.getAllPosts((err, data) => {
        if (err) {
            res.status(500).send({
                message: "Some error occurred!"
            })
        } else {
            res.send(data);
        }
    });
}

exports.getOnePost = async (req, res) => {
    const id = req.params.id;
    if (!id || id.length < 24) {
        res.status(400).send({
            message: "Not found this id!"
        });
    } else {
        Post.getOnePost(id, (err, data) => {
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

exports.getTopicPost = async (req, res) => {
    const id = req.params.id;
    if (!id || id.length < 24) {
        res.status(400).send({
            message: "Not found this id!"
        });
    } else {
        Post.getTopicPost(id, (err, data) => {
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

exports.getUserPost = async (req, res) => {
    const id = req.params.id;
    if (!id || id.length < 24) {
        res.status(400).send({
            message: "Not found this id!"
        });
    } else {
        Post.getUserPost(id, (err, data) => {
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

exports.increaseVotes = async (req, res) => {
    const id = req.params.id;
    
    if (!id) {
        res.status(400).send({
            message: "Content can not be empty!",
        });
    } else {
        Post.increaseVotes(id,  (err, data) => {
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
        Post.decreaseVotes(id,  (err, data) => {
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
        Post.update(id, dataUpdate, (err, data) => {
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
        Post.delete(id, (err, data) => {
            if (err)
                res.status(500).send({
                    message: "Some error occurred while creating the Customer.",
                });
            else {
                res.send(data);
            };
        });
    };
};