// const db = require('../../config/config.db')
const moment = require("moment");
const { response } = require("../utils/response");
const pointSchema = require("../schema/point.schema");
const { ObjectId } = require("bson");
const userSchema = require("../schema/user.schema");
const Point = function (point) {
    this.point = point.point;
    this.authorId = point.authorId;
    this.userId = point.userId;
    this.date = point.date;
    this.reason = point.reason;
    this.hide = point.hide;
    this.seen = point.seen;
};

Point.create = async (newPoint, result) => {
    let point = newPoint;
    if (!newPoint.hide) {
        point = {
            ...point,
            hide: false,
        };
    }
    if (!newPoint.seen) {
        point = {
            ...point,
            seen: false,
        };
    }
    if (!newPoint.date) {
        point = {
            ...point,
            date: new Date(),
        };
    }
    point = new pointSchema(point);
    const queryPoint = await point.save();
    response(queryPoint, result);
};
Point.getHistoryPointUser = async (id, result) => {
    const agg = [
        {
            $match: {
                userId: new ObjectId(id.id),
            },
        },
        {
            $sort: {
                date: -1,
            },
        },
        {
            $lookup: {
                from: "user",
                localField: "userId",
                foreignField: "_id",
                as: "user",
            },
        },
        {
            $lookup: {
                from: "user",
                localField: "authorId",
                foreignField: "_id",
                as: "author",
            },
        },
    ];
    const queryPoint = await pointSchema.aggregate(agg);
    response(queryPoint, result);
};

Point.getListHistoryPoint = async (result) => {
    const agg = [
        {
            $sort: {
                date: -1,
            },
        },
        {
            $lookup: {
                from: "user",
                localField: "userId",
                foreignField: "_id",
                as: "user",
            },
        },
        {
            $lookup: {
                from: "user",
                localField: "authorId",
                foreignField: "_id",
                as: "author",
            },
        },
    ];
    const queryPoint = await pointSchema.aggregate(agg);
    response(queryPoint, result);
};

Point.weeklyRankings = async (result) => {
    const monday = getMonday(new Date());
    let tuesday;
    const checkTue = getTuesday(new Date()).getDate();
    const today = new Date();
    const checkToday = today.getDate();
    if (checkTue > checkToday) {
        const day = today.getDay();
        const diff = checkToday - 6;
        tuesday = new Date(today.setDate(diff));
    } else {
        tuesday = getTuesday(new Date());
    }
    tuesday = new Date(moment(new Date(tuesday)).format("YYYY-MM-DDT00:00:00Z"));
    const agg = [
        {
            $project: {
                _id: 1,
                date: 1,
                reason: 1,
                point: 1,
                userId: 1,
                result: {
                    $and: [
                        {
                            $gt: ["$date", tuesday],
                        },
                        {
                            $lt: ["$date", new Date()],
                        },
                    ],
                },
            },
        },
        {
            $match: {
                result: true,
            },
        },
        {
            $group: {
                _id: "$userId",
                point: { $sum: "$point" },
            },
        },
        {
            $sort: {
                point: -1,
            },
        },
        {
            $lookup: {
                from: "user",
                localField: "_id",
                foreignField: "_id",
                as: "user",
            },
        },
    ];
    const queryPoint = await pointSchema.aggregate(agg);
    response(queryPoint, result);
};

Point.monthlyRankings = async (result) => {
    const date = new Date();
    let firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    const today = new Date();

    const agg = [
        {
            $project: {
                _id: 1,
                date: 1,
                reason: 1,
                point: 1,
                userId: 1,
                result: {
                    $and: [
                        {
                            $gt: ["$date", new Date(firstDay.toISOString())],
                        },
                        {
                            $lt: ["$date", new Date(today.toISOString())],
                        },
                    ],
                },
            },
        },
        {
            $match: {
                result: true,
            },
        },
        {
            $group: {
                _id: "$userId",
                point: { $sum: "$point" },
            },
        },
        {
            $sort: {
                point: -1,
            },
        },
        {
            $lookup: {
                from: "user",
                localField: "_id",
                foreignField: "_id",
                as: "user",
            },
        },
    ];
    const queryPoint = await pointSchema.aggregate(agg);
    response(queryPoint, result);
};

Point.rankings = async (result) => {
    const agg = [
        {
            $sort: {
                point: -1,
            },
        },
    ];
    const queryPoint = await userSchema.aggregate(agg);
    response(queryPoint, result);
};

const findOnePoint = async (id) => {
    try {
        const filter = { _id: new ObjectId(id) };
        const find = await pointSchema.findById(filter);
        return find;
    } catch (error) {
        return error;
    }
};

Point.updateSeenNotifications = async (userId, pointUpdate, result) => {
    const filter = { userId: new ObjectId(userId) };
    const queryPoint = await pointSchema.updateMany(filter, { $set: pointUpdate }, { multi: true });
    if (queryPoint.nModified == 0) {
        return result(
            {
                response: `no success`,
                success: false,
                errorCode: 1,
            },
            null
        );
    }
    return result(null, { response: queryPoint, success: true, errorCode: 0 });
};

Point.update = async (pointId, pointUpdate, result) => {
    const filter = { _id: new ObjectId(pointId) };
    const queryPoint = await pointSchema.updateOne(filter, { $set: pointUpdate }, { multi: true });
    if (queryPoint.nModified != 1) {
        return result(
            {
                response: `no success`,
                success: false,
                errorCode: 1,
            },
            null
        );
    }
    return result(null, { response: queryPoint, success: true, errorCode: 0 });
};

Point.delete = async (id, result) => {
    const queryPoint = await pointSchema.deleteOne({ _id: new ObjectId(id) });
    if (queryPoint.deletedCount == 0) {
        return result(
            {
                response: `no point with id = ${id} `,
                success: false,
                errorCode: 1,
            },
            null
        );
    }
    return result(null, { response: queryPoint, success: true, errorCode: 0 });
};

Point.notification = async (id, result) => {
    const date = new Date();
    let firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    const aggregate = [
        {
            $match: {
                userId: new ObjectId(id),
            },
        },
        {
            $project: {
                point: 1,
                authorId: 1,
                userId: 1,
                seen: 1,
                reason: 1,
                date: 1,
                result: { $gte: ["$date", new Date(firstDay.toISOString())] },
                _id: 1,
            },
        },
        {
            $match: {
                result: true,
            },
        },
    ];
    const queryPoint = await pointSchema.aggregate(aggregate);
    response(queryPoint, result);
};
const formatDate = (day) => {
    return moment(day).format("YYYY-MM-DD");
};

const getTuesday = (d) => {
    d = new Date(d);
    var day = d.getDay(),
        diff = d.getDate() - day + (day == 0 ? -6 : 2);
    return new Date(d.setDate(diff));
};

const getMonday = (d) => {
    d = new Date(d);
    var day = d.getDay(),
        diff = d.getDate() - day + (day == 0 ? -6 : 1);
    return new Date(d.setDate(diff));
};

module.exports = Point;
