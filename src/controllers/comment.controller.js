const Comment = require('../repositories/comment.repository');

exports.getCommentUser = async (req, res) => {
    const id = req.params;
    if (!id) {
        res.status(400).send({
            message: "Not found id!",
        });
    }
    Comment.getCommentUser(id, (err, data) => {
        if (err) 
            res.status(500).send({
                message: "Some error occurred while creating the Customer.",
            });
        else {
            if (data.success) {
                const response = data.response.map((item) => {
                    return {
                        _id: item._id,
                        userId: item.userId,
                        strength: item.strength,
                        weakness: item.weakness,
                        target: item.target,
                        month: item.month,
                        year: item.year,
                    }
                });

                res.send({response, success: data.success, errorCode: data.errorCode});
            }
            else {
                res.send(data);
            }
        }
    });
};