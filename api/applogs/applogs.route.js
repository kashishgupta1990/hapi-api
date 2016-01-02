"use strict";

var Joi = require('joi');


//Routs Lists
module.exports = [
    {
        path: '/api/v1/applogs',
        method: ['GET','POST','PUT','DELETE'],
        config: {
            description: 'applogs',
            notes: 'applogs',
            tags: ['api'],
            plugins :{'hapi-role-manager':['user','admin']},
            handler: function (request, reply) {

                console.log(request.payload);
                reply({status:'app logs'});

            }
        }
    }
];