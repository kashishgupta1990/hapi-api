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
        method: ['GET'],
        config: {
            description: 'Show ToDo Task',
            notes: 'Show ToDo Task',
            tags: ['api'],
            auth: 'jwt',
            plugins :{
                'hapiRoleManager':['admin']
            },
            validate: {
                headers: Joi.object({
                    'authorization': Joi.string().required()
                }).unknown()
            },
            handler: (request, reply)=> {
                var requiredData = {
                    email: request.auth.credentials.email
                };
                db.toDoList.showAllTasks(requiredData, (err, data)=> {
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