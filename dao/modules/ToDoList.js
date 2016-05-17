'use strict';

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
    remove: (descriptionText, callback)=> {
        /*
         * email:yoman@gmail.com,
         * password:********
         * */
        //Model.User.update({}, callback);
    },
    changeTaskStatus: (data, callback)=> {
        /*
         * email:yoman@gmail.com,
         * password:********
         * */
        //Model.User.findOne(data, callback);
    }
};

module.exports = ToDoListModule;