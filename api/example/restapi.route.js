"use strict";

var Joi = require('joi');

//Routs Lists
module.exports = [
    {
        path: '/rest/example/test',
        method: ['GET', 'POST', 'PUT', 'DELETE'],
        config: {
            description: 'REST API in one go',
            notes: 'Yes, I am doing some fun..',
            tags: ['api'],
            handler: function (request, reply) {
                reply({status: 'Testing my REST API'});
            }
        }
    }
];