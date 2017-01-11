var HapiSwagger = require('hapi-swagger');
var Inert = require('inert');
var Vision = require('vision');
var Pack = requireFile('package.json');
var async = require('async');
var path = require('path');

module.exports = exports = (server, callback)=> {
    // Swagger Plugin
    var pluginList = [];

    // Static Directory Route
    pluginList.push((callback)=> {
        let staticDir = path.join(process.env.PWD, 'client');
        server.register(Inert, (err)=> {
            if (err) {
                console.error('Inert ', err);
                throw err;
            }
        });
        server.route({
            method: 'GET',
            config: {
                auth: false
            },
            path: '/{param*}',
            handler: {
                directory: {
                    path: staticDir
                }
            }
        });
        callback(null, 'Static Directory Configured');
    });

    // Swagger
    pluginList.push((callback)=> {
        var swaggerOptions = {
            info: {
                'title': 'API Documentation',
                'version': Pack.version,
                'contact': {
                    'name': 'Kashish Gupta',
                    'email': 'kashishgupta1990@yahoo.com'
                }
            }
        };
        server.register([
            Inert,
            Vision,
            {
                register: HapiSwagger,
                options: swaggerOptions
            }], (err)=> {
            if (err) {
                console.error('Swagger ', err);
                throw err;
            } else {
                callback(err, 'Swagger Registered Successfully')
            }
        });
    });

    // Good Plugin (for logging)
    pluginList.push((callback)=> {
        var goodOptions = {
            ops: {
                interval: 30 * 1000
            },
            reporters: {
                console: [{
                    module: 'good-squeeze',
                    name: 'Squeeze',
                    args: [{log: '*', response: '*', ops: '*'}]
                }, {
                    module: 'good-console',
                    args: [{
                        format:'DD/MM/YYYY, h:mm:ss a',
                        utc: false,
                        color: true
                    },{
                        log: '*',
                        response: '*'
                    }]
                }, 'stdout'],
                file: [{
                    module: 'good-squeeze',
                    name: 'Squeeze',
                    args: [{ops: '*'}]
                }, {
                    module: 'good-squeeze',
                    name: 'SafeJson'
                }],
                http: [{
                    module: 'good-squeeze',
                    name: 'Squeeze',
                    args: [{error: '*'}]
                }, {
                    module: 'good-http',
                    args: ['http://localhost:3000', {
                        wreck: {
                            headers: {'x-api-key': 12345}
                        }
                    }]
                }]
            }
        };
        server.register({
            register: require('good'),
            options: goodOptions
        }, (err)=> {
            if (err) {
                console.error('Good ', err);
                throw err;
            } else {
                callback(err, 'Good Registered Successfully');
            }
        });
    });

    // JSON Web Token
    pluginList.push(function (callback) {
        server.register(require('hapi-auth-jwt2'), (err)=> {
            if (err) {
                throw err;
            } else {
                server.auth.strategy('jwt', 'jwt', {
                    key: process.env.JWT_KEY,          // Never Share your secret key
                    validateFunc: (decoded, request, callback) => {
                        // do your checks to see if the person is valid
                        if (!decoded.email) {
                            return callback(null, false);
                        }
                        else {
                            request.tokenData = decoded;
                            return callback(null, true);
                        }
                    },
                    // validate function defined above
                    verifyOptions: {
                        ignoreExpiration: true,
                        algorithms: ['HS256']
                    } // pick a strong algorithm
                });

                server.auth.default('jwt');
                callback(err, 'JSON Web Token Enabled');
            }
        });
    });

    // Hapi Role Manager
    pluginList.push((callback)=> {
        var options = {
            roles: ['admin','guest']
        };
        server.register({
            register: requireFile('modules/customPlugin/hapiRoleManager'),
            options: options
        }, function (err) {
            if (err) {
                throw err;
            }
            var msg = 'Hapi Roles Plugin loaded';
            callback(err, msg);
        });
    });


    // Plugin Applied
    async.parallel(pluginList, (err, result)=> {
        if (err) {
            console.error(err);
            throw err;
        } else {
            callback(err, 'Plugins Registered Successfully');
        }
    });
};