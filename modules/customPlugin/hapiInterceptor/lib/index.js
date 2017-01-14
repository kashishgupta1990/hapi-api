var Boom = require('boom');

exports.register = function (server, options, next) {

    var pluginName = 'hapiRoleManager';

    /* Uncomment the below method for usage */
    /*server.ext('onPreAuth', function (request, reply) {
        // Do something useful
        reply.continue();
    });*/

    /* Uncomment the below method for usage */
    /*server.ext('onPostAuth', function (request, reply) {
        // Do something useful
        reply.continue();
    });*/

    /* Uncomment the below method for usage */
    /*server.ext('onPreHandler', function (request, reply) {
        // Do something useful
        reply.continue();
    });*/

    server.ext('onPostHandler', function (request, reply) {
        if (request.headers.authorization) {
            request.response.header("Authorization", request.headers.authorization);
        }
        reply.continue();
    });

    return next();
};


exports.register.attributes = {
    pkg: require('../package.json')
};