const notificationsSchema = require("../schema/notifications.schema");
const { ObjectId } = require("bson");
const { response } = require("../utils/response");

const Notifications = function (notifications) {
    this.userId = notifications.userId;
    this.topicId = notifications.topicId;
    this.userCreateId = notifications.userCreateId;
    this.date = notifications.date;
}

Notifications.create = async (newNotice, result) => {
    let notice = newNotice;
    if (!newNotice.date) {
        notice = {
            ...notice,
            date: new Date(),
        }
    }
    notice = new notificationsSchema(notice);
    const query = await notice.save();
    response(query, result);
}

Notifications.getUserNotifications = async (id, result) => {
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
                localField: "userCreateId",
                foreignField: "_id",
                as: "userCreate",
            }
        },
    ];
    const query = await notificationsSchema.aggregate(agg);
    response(query, result);
}

module.exports = Notifications;
