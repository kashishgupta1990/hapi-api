// File Path: dao/modules/User.js
'use strict';

var ObjectId = require('mongoose').Types.ObjectId;
var UserModule = {
    add: (data, callback)=> {
        Model.User.insert({
            "name": data.name, "age": data.age
        }, callback);
    },
    remove: (data, callback)=> {
        Model.User.remove({
            _id: new ObjectId(data.id)
        }, callback);
    },
    update: (data, callback)=> {
        let updateQuery = {};
        if (data.name) {
            updateQuery.name = data.name;
        }
        if (data.age) {
            updateQuery.age = data.age;
        }

        Model.User.update({
            _id: new ObjectId(data.id)
        }, updateQuery, callback);
    },
    showUserById: (data, callback)=> {
        Model.User.findOne({
            _id: data.id
        }, callback);
    },
    showAllUser: (data, callback)=> {
        Model.User.find({}, callback);
    }
};

module.exports = UserModule;