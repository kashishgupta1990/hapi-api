"use strict";

var Joi = require('joi');


//Routs Lists
module.exports = [
    {
        path: '/api/v1/auth/google/callback',
        method: ['GET','POST','PUT','DELETE'],
        config: {
            description: 'Login Here',
            notes: 'Do login here',
            tags: ['api'],
            plugins :{'hapi-role-manager':['user','admin']},
            handler: function (request, reply) {

                console.log(request);
                reply({status:'ok na'});

            }
        }
    }
];