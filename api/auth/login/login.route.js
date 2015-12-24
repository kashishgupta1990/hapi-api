"use strict";

var Joi = require('joi');
var service = {
    login:require('./login.service')
};

//Routs Lists
module.exports = [
    {
        path: '/api/v1/auth/login',
        method: ['POST'],
        config: {
            description: 'Login Here',
            notes: 'Do login here',
            tags: ['api'],
            plugins: {
                'hapi-auth-cookie': {
                    redirectTo: false
                },
                'hapi-role-manager':['user']
            },
            handler: function (request, reply) {

                //To Authenticate User
                request.auth.session.set({roles: ['user'], password: 'pioneer'});
                service.login.login();
                reply('successfully login');

            }
        }
    }
];