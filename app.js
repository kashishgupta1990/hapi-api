'use strict';

var Hapi = require('hapi');
var fs = require('fs');
var Inert = require('inert');
var Vision = require('vision');
var async = require('async');
var HapiSwagger = require('hapi-swagger');
var Pack = require('./package');
var appConfig = require('./config/Config.json');
var pluginList = [];
var serverTasks = [];

// Global variables
const _ENV_NAME = process.env.NAME || 'development';
const _APP_CONFIG = appConfig[_ENV_NAME];
const _PORT = process.env.PORT || _APP_CONFIG.server.port;
const _HOST = process.env.HOST || _APP_CONFIG.server.host;

// Create a server with a host and port
var server = new Hapi.Server();
server.connection({
    host: _HOST,
    port: _PORT
});

// Plugins
serverTasks.push((callback)=> {
    // Swagger Plugin
    pluginList.push((callback)=> {
        var swaggerOptions = {
            info: {
                'title': 'API Documentation',
                'version': Pack.version
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
            opsInterval: 1000,
            reporters: [{
                reporter: require('good-console'),
                events: {
                    log: '*',
                    response: '*'
                }
            }]
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

    // Plugin Applied
    async.series(pluginList, (err, result)=> {
        if (err) {
            console.error(err);
            throw err;
        } else {
            callback(err, 'Plugins Registered Successfully');
        }
    });
});

// Route Configuration
serverTasks.push((callback)=> {
    function applyRouteConfig(dirPath) {
        var dirName = dirPath;
        var data = fs.readdirSync(dirName);
        data.forEach(function (dta) {
            var path = dirName + '/' + dta;
            if (fs.lstatSync(path).isDirectory()) {
                applyRouteConfig(path);
            } else if (dta.match(/.route./)) {
                server.route(require(path));
            }
        });
    }

    applyRouteConfig(__dirname + '/api');
    callback(null, 'Routes congig successsfully');
});

// Static Directory Route
serverTasks.push((callback)=> {
    server.register(Inert, (err)=> {
        if (err) {
            console.error('Inert ', err);
            throw err;
        }
    });
    server.route({
        method: 'GET',
        path: '/{param*}',
        handler: {
            directory: {
                path: __dirname + '/public'
            }
        }
    });
    callback(null,'Static Directory Configured');
});

// Start the server
async.series(serverTasks, (err, result)=> {
    if (err) {
        console.error('Before Server Start ', err);
        throw err;
    } else {
        server.start((err) => {
            if (err) {
                console.error(err);
                throw err;
            } else {
                console.log('Server running at:', server.info.uri);
            }
        });
    }
});