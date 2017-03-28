"use strict";

//Routs Lists
module.exports = [
    {
        path: '/',
        method: ['GET'],
        config: {
            description: 'Login Here',
            notes: 'Do login here',
            tags: ['api'],
            auth: false,
            handler: function (request, reply) {
                // Render the view with the custom greeting
                var data = {
                    title: 'This is Index!',
                    message: 'Hello, World. You crazy handlebars layout'
                };

                return reply.view('index', data);
            }
        }
    }
];