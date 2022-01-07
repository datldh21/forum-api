const { ObjectId } = require("bson");
const postSchema = require("../schema/post.schema");
const { response } = require("../utils/response");

const Post = function (post) {
    this.categoryId = post.categoryId;
    this.topicId = post.topicId;
    this.userId = post.userId;
    this.content = post.content;
    this.votes = post.votes;
    this.date = post.date;
    this.seen = post.seen;
}

Post.create = async (newPost, result) => {
    let post = newPost;
    if (!newPost.date) {
        post = {
            ...post,
            date: new Date(),
        };
    };
    post = new postSchema(post);
    const queryPost = await post.save();
    response(queryPost, result);
};

Post.getAllPosts = async (result) => {
    const agg = [
        {
            $lookup: {
                from: "user",
                localField: "userId",
                foreignField: "_id",
                as: "user",
            }
        }
    ]
    const queryPost = await postSchema.aggregate(agg);
    response(queryPost, result);
}

Post.getOnePost = async (id, result) => {
    const agg = [
        {
            $match: {
                _id: new ObjectId(id),
            }
        },
        {
            $lookup: {
                from: "topic",
                localField: "topicId",
                foreignField: "_id",
                as: "topic",
            }
        },
        {
            $lookup: {
                from: "user",
                localField: "userId",
                foreignField: "_id",
                as: "user",
            }
        }
    ];
    const queryPost = await postSchema.aggregate(agg);
    response(queryPost, result);
};

Post.getTopicPost = async (id, result) => {
    const agg = [
        {
            $match: {
                topicId: new ObjectId(id),
            }
        },
        {
            $lookup: {
                from: "topic",
                localField: "topicId",
                foreignField: "_id",
                as: "topic",
            }
        },
        {
            $lookup: {
                from: "user",
                localField: "userId",
                foreignField: "_id",
                as: "user",
            }
        }
    ];
    const queryPost = await postSchema.aggregate(agg);
    response(queryPost, result);
};

Post.getUserPost = async (id, result) => {
    const agg = [
        {
            $match: {
                userId: new ObjectId(id),
            }
        },
        {
            $sort: {
                date: -1,
            }
        },
        {
            $lookup: {
                from: "topic",
                localField: "topicId",
                foreignField: "_id",
                as: "topic",
            }
        },
        {
            $lookup: {
                from: "user",
                localField: "userId",
                foreignField: "_id",
                as: "user",
            }
        }
    ];
    const queryPost = await postSchema.aggregate(agg);
    response(queryPost, result);
};

Post.update = async (postId, postUpdate, result) => {
    const filter = { _id: new ObjectId(postId) };
    const queryPost = await postSchema.updateOne(filter, { $set: postUpdate }, { multi: true });
    return (null, {
        response: queryPost,
    });
};

Post.delete = async (id, result) => {
    const queryPost = await postSchema.deleteOne({ _id: new ObjectId(id) });
    if (queryPost.deletedCount == 0) {
        return result(
            {
                response: `no post with id = ${id}`,
                success: false,
                errorCode: 1,
            }, null
        );
    }
    return result(
        {
            response: queryPost,
            success: true,
            errorCode: 0
        }
    );
};

module.exports = Post;
