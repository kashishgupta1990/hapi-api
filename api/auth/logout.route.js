"use strict";

var Joi = require('joi');

//Routs Lists
module.exports = [
    {
        path: '/api/v1/auth/logout',
        method: ['POST'],
        config: {
            description: 'Logout Here',
            notes: 'Do logout here',
            tags: ['api'],
            auth: 'jwt',
            validate: {
                headers: Joi.object({
                    'authorization': Joi.string().required()
                }).unknown()
            },
            handler: function (request, reply) {
                // Todo clear from server
                request.headers.authorization = '';
                //To Authenticate User
                reply({
                    status:true,
                    message:'logout successfully',
                    data:{}
                });
            }
        }
    }
];