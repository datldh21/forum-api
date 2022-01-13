const categorySchema = require("../schema/category.schema");
const { ObjectId } = require("bson");
const { response } = require("../utils/response");

const Category = function (category) {
    this.name = category.name;
    this.description = category.description;
    this.icon = category.icon;
    this.topicCount = category.topicCount;
    this.postCount = category.postCount;
}

Category.create = async (newCategory, result) => {
    let category = newCategory;
    category = new categorySchema(category);
    const query = await category.save();
    response(query, result);
}

Category.getOneCategory = async (id, result) => {
    const filter = { _id: new ObjectId(id) };
    const query = await categorySchema.find(filter);
    response(query, result);
}

Category.getAllCategory = async (result) => {
    const query = await categorySchema.find({});
    response(query, result);
}

Category.updateTopicCount = async (id, result) => {
    const filter = { _id: new ObjectId(id) };
    const query = await categorySchema.updateOne(filter, {$inc: {topicCount: 1}});
    result (null, { response: query });
}

Category.increasePostCount = async (id, result) => {
    const filter = { _id: new ObjectId(id) };
    const query = await categorySchema.updateOne(filter, {$inc: {postCount: 1}});
    result (null, { response: query });
}

Category.decreasePostCount = async (id, result) => {
    const filter = { _id: new ObjectId(id) };
    const query = await categorySchema.updateOne(filter, {$inc: {postCount: -1}});
    result (null, { response: query });
}

Category.update = async (id, categoryUpdate, result) => {
    const filter = { _id: new ObjectId(id) };
    const query = await categorySchema.updateOne(filter, {$set: categoryUpdate}, {multi: true});
    return (null, { response: query });
};

Category.delete = async (id, result) => {
    const query = await categorySchema.deleteOne({ _id: new ObjectId(id) });
    if (query.deletedCount == 0) {
        return result(
            {
                response: `no caegory with id = ${id}`,
                success: false,
                errorCode: 1,
            }, null
        );
    }
    return result(
        {
            response: query,
            success: true,
            errorCode: 0
        }
    );
}

module.exports = Category;