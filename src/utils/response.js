// const db = require('../../config/config.db')
const userSchema = require('../schema/user.schema');

exports.response = (query, result) => {
    try {
        if (query.length == 0) {
            return result(null, {
                response: `no success`,
                success: false,
                errorCode: 1,
            });
        }
        return result(null, { response: query, success: true, errorCode: 0 });
    } catch (error) {
        return result(error, null);
    }
};
