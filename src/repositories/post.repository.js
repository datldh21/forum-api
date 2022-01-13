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

Post.increaseVotes = async (id, result) => {
    const filter = { _id: new ObjectId(id) };
    const query = await postSchema.updateOne(filter, {$inc: {votes: 1}});
    result (null, { response: query });
}

Post.decreaseVotes = async (id, result) => {
    const filter = { _id: new ObjectId(id) };
    const query = await postSchema.updateOne(filter, {$inc: {votes: -1}});
    result (null, { response: query });
}

Post.update = async (postId, postUpdate, result) => {
    const filter = { _id: new ObjectId(postId) };
    const queryPost = await postSchema.updateOne(filter, { $set: postUpdate }, { multi: true });
    result (null, {
        response: queryPost,
    });
};

Post.delete = async (id, result) => {
    const query = await postSchema.deleteOne({ _id: new ObjectId(id) });
    if (query.deletedCount == 0) {
        return result({
            response: `no point with id = ${id}`,
            success: false,
            errorCode: 1
        }, null);
    }
    return result(null, {
        response: query,
        success: true,
        errorCode: 0
    });
};

module.exports = Post;
