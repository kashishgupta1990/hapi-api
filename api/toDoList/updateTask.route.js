"use strict";

var Joi = require('joi');
var path = require('path');
var db = {
    toDoList: requireFile('db/modules/ToDoList')
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
                },
                headers: Joi.object({
                    'authorization': Joi.string().required()
                }).unknown()
            },
            auth: 'jwt',
            handler: (request, reply)=> {
                var requiredData = {
                    email: request.auth.credentials.email,
                    taskId: request.params.taskId,
                    completed: request.payload.completed,
                    description: request.payload.description
                };
                db.toDoList.updateTaskStatus(requiredData, (err, data)=> {
                    if (err) {
                        reply({
                            status: false,
                            message: 'Failed to update your task.',
                            data: err
                        }).header("Authorization", request.headers.authorization);
                    } else {
                        reply({
                            status: true,
                            message: 'Task successfully updated.',
                            data: data
                        }).header("Authorization", request.headers.authorization);
                    }
                });
            }
        }
    }
];