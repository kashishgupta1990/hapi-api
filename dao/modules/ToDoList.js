'use strict';
var ObjectId = require('mongoose').Types.ObjectId;
var ToDoListModule = {
    add: (data, callback)=> {
        /*
         * description: Write some task here,
         * completed: false,
         * removed: false
         * */

        Model.User.update({"email": data.email}, {
            $push: {
                toDoList: {
                    description: data.description
                }
            }
        }, callback);
    },
    remove: (data, callback)=> {
        Model.User.update({
            email: data.email,
            'toDoList._id': new ObjectId(data.taskId)
        }, {
            $set: {
                "toDoList.$.removed": true
            }
        }, callback);
    },
    updateTaskStatus: (data, callback)=> {
        let updateQuery = {
            $set: {}
        };
        if (data.completed) {
            updateQuery.$set["toDoList.$.completed"] = data.completed;
        }
        if (data.description) {
            updateQuery.$set["toDoList.$.description"] = data.description;
        }

        Model.User.update({
            email: data.email,
            'toDoList._id': new ObjectId(data.taskId)
        }, updateQuery, callback);
    },
    showAllTasks: (data, callback)=> {
        Model.User.findOne({
            email: data.email
        }, {
            toDoList: true,
            _id: false
        }, callback);
    }
};

module.exports = ToDoListModule;