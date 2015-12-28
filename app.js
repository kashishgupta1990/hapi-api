'use strict';


// Variables
var Hapi = require('hapi');
var fs = require('fs');
var Inert = require('inert');
var Vision = require('vision');
var async = require('async');
var HapiSwagger = require('hapi-swagger');
var Pack = require('./package');
var appConfig = require('./config/Config.json');
var mongoose = require('mongoose');
var pluginList = [];
var path = require('path');
var hapiRole = require('./custom_modules/hapi-role-manager');
var serverTasks = [];

// Constant variables
const _ENV_NAME = process.env.NAME || 'development';
const _APP_CONFIG = appConfig[_ENV_NAME];
const _PORT = process.env.PORT || _APP_CONFIG.server.port;
const _HOST = process.env.HOST || _APP_CONFIG.server.host;

// Global Variables
global._APP_DIR = __dirname;
global.Model = {};

// Create a server with a host and port
var server = new Hapi.Server();
server.connection({
    host: _HOST,
    port: _PORT,
    routes: {
        cors: _APP_CONFIG.server.allowCrossDomain
    }
});

// MongoDB Connection
serverTasks.push((callback)=> {

    // Connect Method
    mongoose.connect(_APP_CONFIG.database.url, {
        server: {
            poolSize: _APP_CONFIG.database.poolSize
        }
    }, (dd, err)=> {
        var schemaDirPath = path.join(global._APP_DIR, 'dao', 'schema');
        if (err) {
            console.error('Failed to connect with MongoDB. ' + err);
            throw err;
        } else {
            fs.readdir(schemaDirPath, (error, fileList)=> {
                fileList.forEach((fileName)=> {
                    var modelName = fileName.replace(/.js/, '');
                    var schemaObject = require(path.join(schemaDirPath, fileName));
                    var schema = mongoose.Schema(schemaObject.schema);
                    schemaObject.modelMethods.forEach((modelMethods)=>{
                        schema.methods[modelMethods.name] = modelMethods.action;
                    });
                    global.Model[modelName] = mongoose.model(modelName, schema);
                });

                callback(err, 'MongoDB Successfully Connected');
            });
        }
    });
});

// Plugin Registration Operations
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

    // Hapi Auth Cookie
    pluginList.push(function (callback) {
        server.register(require('hapi-auth-cookie'), (err)=> {
            if(err){
                throw err;
            }else{
                server.auth.strategy('session', 'cookie', {
                    password: _APP_CONFIG.cookie.password,
                    cookie: _APP_CONFIG.cookie.cookie,
                    redirectTo: _APP_CONFIG.cookie.redirectTo,
                    isSecure: _APP_CONFIG.cookie.isSecure
                });
                callback(err, 'Hapi Auth Cookie Enabled');
            }
        });
    });

    // Hapi Role Manager
    pluginList.push(function (callback) {
        server.register({
            register: hapiRole,
            options: {
                rolesType: _APP_CONFIG.userRoles.rolesType,
                cookieName: _APP_CONFIG.cookie.cookie,
                roleFieldName: _APP_CONFIG.userRoles.roleFieldName
            }
        }, function (err) {
            if (err) {
                console.error(err);
                throw err;
            }
            callback(err, 'Hapi Roles Plugin loaded');
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
    callback(null, 'Static Directory Configured');
});

//Running Bootstrap Task
serverTasks.push(function (callback) {
    var bootstrap = require('./config/Bootstrap');
    bootstrap(_ENV_NAME, callback);
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