"use strict";

var Joi = require('joi');

//Routs Lists
module.exports = [
    {
        path: '/api/v1/user',
        method: ['POST'],
        config: {
            description: 'Add new User',
            notes: 'Add new User',
            tags: ['api'],
            validate: {
                payload: {
                    name: Joi.string().required(),
                    age: Joi.number().required()
                }
            },
            handler: (request, reply)=> {
                reply({
                    status: true,
                    data: request.payload
                });
            }
        }
    }
];