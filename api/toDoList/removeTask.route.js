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
        method: ['DELETE'],
        config: {
            description: 'Remove ToDo Task',
            notes: 'Remove ToDo Task',
            tags: ['api'],
            validate: {
                params: {
                    taskId: Joi.string().required()
                },
                headers: Joi.object({
                    'authorization': Joi.string().required()
                }).unknown()
            },
            auth: 'jwt',
            handler: (request, reply)=> {
                var requiredData = {
                    email: request.auth.credentials.email,
                    taskId: request.params.taskId
                };
                db.toDoList.remove(requiredData, (err, data)=> {
                    if (err) {
                        reply({
                            status: false,
                            message: 'Failed to add your task.',
                            data: err
                        }).header("Authorization", request.headers.authorization);
                    } else {
                        reply({
                            status: true,
                            message: 'Task successfully removed.',
                            data: data
                        }).header("Authorization", request.headers.authorization);
                    }
                });
            }
        }
    }
];