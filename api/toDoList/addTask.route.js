"use strict";

var Joi = require('joi');
var path = require('path');
var db = {
    toDoList: requireFile('db/modules/ToDoList')
};

//Routs Lists
module.exports = [
    {
        path: '/api/v1/todolist',
        method: ['POST'],
        config: {
            description: 'Add new ToDo Task',
            notes: 'Add new ToDo Task',
            tags: ['api'],
            validate: {
                payload: {
                    description: Joi.string().required()
                },
                headers: Joi.object({
                    'authorization': Joi.string().required()
                }).unknown()
            },
            auth: 'jwt',
            handler: (request, reply)=> {
                var requiredData = {
                    email: request.auth.credentials.email,
                    description: request.payload.description
                };

                // Access Token Data
                console.log('User Token Data: ',request.tokenData);

                db.toDoList.add(requiredData, (err, data)=> {
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