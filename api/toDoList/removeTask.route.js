"use strict";

var Joi = require('joi');
var path = require('path');
var dao = {
    toDoList: require(path.join(global._APP_DIR, 'dao', 'modules', 'ToDoList'))
};

//Routs Lists
module.exports = [
    {
        path: '/api/v1/todolist/{taskId}',
        method: ['DELETE'],
        config: {
            description: 'Remove ToDo Task',
            notes: 'Remove ToDo Task',
            tags: ['api'],
            validate: {
                params: {
                    taskId: Joi.string().required()
                }
            },
            auth: {mode: 'try', strategy: 'session'},
            plugins: {'hapi-role-manager': ['user']},
            handler: (request, reply)=> {
                var requiredData = {
                    email: request.auth.credentials.email,
                    taskId: request.params.taskId
                };
                dao.toDoList.remove(requiredData, (err, data)=> {
                    if (err) {
                        reply({
                            status: false,
                            message: 'Failed to add your task.',
                            data: err
                        });
                    } else {
                        reply({
                            status: true,
                            message: 'Task successfully removed.',
                            data: data
                        });
                    }
                });
            }
        }
    }
];