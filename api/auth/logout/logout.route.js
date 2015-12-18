"use strict";

var Joi = require('joi');

//Routs Lists
module.exports = [
    {
        path: '/api/v1/auth/logout',
        method: ['POST'],
        config: {
            description: 'Login Here',
            notes: 'Do login here',
            tags: ['api'],
            handler: function (request, reply) {

                //To Authenticate User
                /*request.auth.session.clear();*/
                reply('logout successfully');

            }
        }
    }
];