const { ObjectId } = require("bson");
const topicSchema = require("../schema/topic.schema");
const { response } = require("../utils/response");

const Topic = function (topic) {
    this.categoryId = topic.categoryId;
    this.name = topic.name;
    this.startDate = topic.startDate;
    this.userCreate = topic.userCreate;
    this.voteCount = topic.voteCount;
    this.postCount = topic.postCount;
    this.viewCount = topic.viewCount;
}

Topic.create = async (newTopic, result) => {
    let topic = newTopic;
    if (!newTopic.startDate) {
        topic = {
            ...topic,
            startDate: new Date()
        }
    }
    topic = new topicSchema(topic);
    const queryTopic = await topic.save();
    response(queryTopic, result);
}

Topic.getRecentTopic = async (result) => {
    const agg = [
        {
            $sort: {
                startDate: -1,
            }
        },
        {
            $lookup: {
                from: "category",
                localField: "categoryId",
                foreignField: "_id",
                as: "category"
            }
        },
        {
            $lookup: {
                from: "user",
                localField: "userCreate",
                foreignField: "_id",
                as: "user"
            }
        }
    ];
    const queryTopic = await topicSchema.aggregate(agg);
    response(queryTopic, result);
}

Topic.getOneTopic = async (id, result) => {
    const agg = [
        {
            $match: {
                _id: new ObjectId(id)
            }
        },
        {
            $lookup: {
                from: "category",
                localField: "categoryId",
                foreignField: "_id",
                as: "category"
            }
        },
        {
            $lookup: {
                from: "user",
                localField: "userCreate",
                foreignField: "_id",
                as: "user"
            }
        }
    ];
    const queryTopic = await topicSchema.aggregate(agg);
    response(queryTopic, result);
}

Topic.getCategoryTopic = async (id, result) => {
    const agg = [
        {
            $match: {
                categoryId: new ObjectId(id)
            }
        },
        {
            $lookup: {
                from: "category",
                localField: "categoryId",
                foreignField: "_id",
                as: "category"
            }
        },
        {
            $lookup: {
                from: "user",
                localField: "userCreate",
                foreignField: "_id",
                as: "user"
            }
        }
    ];
    const queryTopic = await topicSchema.aggregate(agg);
    response(queryTopic, result);
}

Topic.update = async (topicId, topicUpdate, result) => {
    const filter = { _id: new ObjectId(topicId) };
    const queryTopic = await topicSchema.updateOne(filter, { $set: topicUpdate }, { multi: true} );
    return (null, { response: queryTopic });
}

Topic.delete = async (id, result) => {
    const queryTopic = await topicSchema.deleteOne({ _id: new ObjectId(id) });
    if (queryTopic.deletedCount == 0) {
        return result(
            {
                response: `no topic with id = ${id}`,
                success: false,
                errorCode: 1,
            }, null
        );
    }
    return result(
        {
            response: queryTopic,
            success: true,
            errorCode: 0
        }
    );
}

module.exports = Topic;