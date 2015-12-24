var Boom = require('boom');
var pluginName = 'hapi-role-manager';

exports.register = function (server, options, next) {

    var pluginName = 'hapi-role-manager';

    //Validate your roles used in routes
    server.connections.forEach(function (connection) {

        var routes = (connection.routingTable) ? connection.routingTable() : connection.table();

        // Loop through each connection in the server
        server.connections.forEach(function (connection) {

            var routes = (connection.routingTable) ? connection.routingTable() : connection.table();

            // Loop through each api
            routes.forEach(function (route) {

                var hapiRoleManagerParams = route.settings.plugins[pluginName] ? route.settings.plugins[pluginName] : false;

                //If hapi-role-manager defined in api then
                if (hapiRoleManagerParams !== false) {
                    hapiRoleManagerParams.forEach(function (data) {
                        if (options.rolesType.indexOf(data) === -1) {
                            throw new Error(JSON.stringify({
                                plugin: 'hapi-role-manager',
                                error: '[' + data + '] role is not allowed to use in routes'
                            }));
                        }
                    });
                }
            });
        });
    });

    server.ext('onPostAuth', function (request, reply) {
        var allowedRolesForRequest = request.route.settings.plugins[pluginName];
        var cookieUserRole;
        var isAuthorized = false;
        if (request.state[options.cookieName] && request.state[options.cookieName][options.roleFieldName]) {
            cookieUserRole = request.state[options.cookieName][options.roleFieldName];
            if (allowedRolesForRequest && allowedRolesForRequest.length) {
                if (cookieUserRole && cookieUserRole.length) {
                    allowedRolesForRequest.forEach(function (data) {

                        if (cookieUserRole.indexOf(data) !== -1) {
                            isAuthorized = true;
                        }else {
                            if (cookieUserRole === data) {
                                isAuthorized = true;
                            }
                        }
                    });
                }
                if (!isAuthorized) {
                    return reply(Boom.unauthorized());
                }
            }
        }
        return reply.continue();
    });
    next();
};

exports.register.attributes = {
    pkg: require('../package.json')
};

