const { response } = require("../utils/response");
const commentSchema = require("../schema/comment.schema");
const { ObjectId } = require("bson");

const Comment = function(comment) {
    this.userId = comment.userId;
    this.strength = comment.strength;
    this.weakness = comment.weakness;
    this.target = comment.target;
    this.month = comment.month;
    this.year = comment.year;
};

Comment.getCommentUser = async (id, result) => {
    const agg = [
        {
            $match: {
                userId: new ObjectId(id.id),
            },
        },
        {
            $lookup: {
                from: "user",
                localField: "userId",
                foreignField: "_id",
                as: "userComment",
            }
        }
    ];
    const queryComment = await commentSchema.aggregate(agg);
    response(queryComment, result);
};

module.exports = Comment;
