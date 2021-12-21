// const db = require('../../config/config.db')
const moment = require("moment");
const itemSchema = require("../schema/item.schema");
const { ObjectId } = require("bson");
const { response } = require("../utils/response");
const Item = function (item) {
    this.item = item.item;
    this.description = item.description;
    this.price = item.price;
    this.date = item.date;
    this.title = item.title;
    this.quantity = item.quantity;
    this.limited = item.limited;
};

Item.getUnlimitedItem = async (result) => {
    const agg = [
        {
            $match: {
                limited: false,
            },
        },
        {
            $sort: {
                date: -1,
            },
        },
    ];
    const queryItem = await itemSchema.aggregate(agg);
    response(queryItem, result);
};

Item.getLimitedItem = async (result) => {
    const agg = [
        {
            $match: {
                limited: true,
            },
        },
        {
            $sort: {
                date: -1,
            },
        },
    ];
    const queryItem = await itemSchema.aggregate(agg);
    response(queryItem, result);
};

Item.create = async (item, result) => {
    let newItem = item;
    if (!newItem.limited) {
        newItem = {
            ...newItem,
            limited: false,
        };
    }
    if (!newItem.date) {
        newItem = {
            ...newItem,
            date: new Date(),
        };
    }
    const queryItem = await itemSchema.insertMany(newItem);
    response(queryItem, result);
};

Item.update = async (itemId, itemUpdate, result) => {
    const filter = { _id: new ObjectId(itemId) };
    const itemPoint = await itemSchema.updateOne(filter, { $set: itemUpdate }, { multi: true });
    if (itemPoint.nModified != 1) {
        return result(
            {
                response: `no success`,
                success: false,
                errorCode: 1,
            },
            null
        );
    }
    return result(null, { response: itemPoint, success: true, errorCode: 0 });
};

Item.delete = async (itemId, result) => {
    const queryItem = await itemSchema.deleteOne({ _id: new ObjectId(itemId) });
    if (queryItem.deletedCount == 0) {
        return result(
            {
                response: `no item with id = ${id} `,
                success: false,
                errorCode: 1,
            },
            null
        );
    }
    return result(null, { response: queryItem, success: true, errorCode: 0 });
};
module.exports = Item;
