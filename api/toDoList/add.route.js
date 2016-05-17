"use strict";

var Joi = require('joi');
var path = require('path');
var dao = {
    toDoList: require(path.join(global._APP_DIR, 'dao', 'modules', 'ToDoList'))
};

//Routs Lists
module.exports = [
    {
        path: '/api/v1/todolist/add',
        method: ['POST'],
        config: {
            description: 'Add new ToDo Task',
            notes: 'Add new ToDo Task',
            tags: ['api'],
            validate: {
                payload: {
                    description: Joi.string()
                }
            },
            auth: {mode: 'try', strategy: 'session'},
            plugins: {'hapi-role-manager': ['user']},
            handler: (request, reply)=> {
                var requiredData = {
                    email: request.auth.credentials.email,
                    description: request.payload.description
                };
                dao.toDoList.add(requiredData, (err, data)=> {
                    if (err) {
                        reply({
                            status: false,
                            message: 'Failed to add your task.',
                            data: err
                        });
                    } else {
                        reply({
                            status: true,
                            message: 'Task successfully saved.',
                            data: data
                        });
                    }
                });
            }
        }
    }
];