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
        method: ['PUT'],
        config: {
            description: 'Update ToDo Task',
            notes: 'Update ToDo Task',
            tags: ['api'],
            validate: {
                params: {
                    taskId: Joi.string().required()
                },
                payload: {
                    description: Joi.string(),
                    completed: Joi.boolean()
                }
            },
            auth: {mode: 'try', strategy: 'session'},
            handler: (request, reply)=> {
                var requiredData = {
                    email: request.auth.credentials.email,
                    taskId: request.params.taskId,
                    completed: request.payload.completed,
                    description: request.payload.description
                };
                dao.toDoList.updateTaskStatus(requiredData, (err, data)=> {
                    if (err) {
                        reply({
                            status: false,
                            message: 'Failed to update your task.',
                            data: err
                        });
                    } else {
                        reply({
                            status: true,
                            message: 'Task successfully updated.',
                            data: data
                        });
                    }
                });
            }
        }
    }
];