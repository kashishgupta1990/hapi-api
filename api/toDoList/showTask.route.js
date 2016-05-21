"use strict";

var Joi = require('joi');
var path = require('path');
var dao = {
    toDoList: require(path.join(global._APP_DIR, 'dao', 'modules', 'ToDoList'))
};

//Routs Lists
module.exports = [
    {
        path: '/api/v1/todolist',
        method: ['GET'],
        config: {
            description: 'Show ToDo Task',
            notes: 'Show ToDo Task',
            tags: ['api'],
            auth: {mode: 'try', strategy: 'session'},
            plugins: {'hapi-role-manager': ['user']},
            handler: (request, reply)=> {
                var requiredData = {
                    email: request.auth.credentials.email
                };
                dao.toDoList.showAllTasks(requiredData, (err, data)=> {
                    if (err) {
                        reply({
                            status: false,
                            message: 'Failed to show all task.',
                            data: err
                        });
                    } else {
                        reply({
                            status: true,
                            message: 'Task successfully fetched.',
                            data: data
                        });
                    }
                });
            }
        }
    }
];