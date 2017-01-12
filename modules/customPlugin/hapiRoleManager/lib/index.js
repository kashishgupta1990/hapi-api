var Boom = require('boom');

exports.register = function (server, options, next) {

    var pluginName = 'hapiRoleManager';

    server.ext('onPreStart', function (server, next) {
        server.connections.forEach(function (connection) {
            // Loop through each connection in the server
            var routes = (connection.routingTable) ? connection.routingTable() : connection.table();
            // Loop through each api
            routes.forEach(function (route) {
                var hapiRoleManagerParams = route.settings.plugins[pluginName] ? route.settings.plugins[pluginName] : false;
                //If hapi-role-manager defined in api then
                if (hapiRoleManagerParams !== false) {
                    hapiRoleManagerParams.forEach(function (data) {
                        if (options.roles.indexOf(data) === -1) {
                            throw new Error(JSON.stringify({
                                plugin: 'hapiRoleManager',
                                error: '[' + data + '] role is not allowed to use in routes'
                            }));
                        }
                    });
                }
            });
        });
        return next();
    });
    server.ext('onPostAuth', function (request, reply) {
        var allowedRolesForRequest = request.route.settings.plugins[pluginName];
        if (allowedRolesForRequest) {
            if (request.tokenData && request.tokenData.role && allowedRolesForRequest.indexOf(request.tokenData.role) !== -1) {
                reply.continue();
            } else {
                reply(Boom.unauthorized());
            }
        }else{
            reply.continue();
        }
    });
    return next();
};


exports.register.attributes = {
    pkg: require('../package.json')
};