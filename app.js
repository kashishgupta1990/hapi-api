'use strict';

var Hapi = require('hapi');
var fs = require('fs');
var Inert = require('inert');
var Vision = require('vision');
var HapiSwagger = require('hapi-swagger');
var Pack = require('./package');

// Create a server with a host and port
const server = new Hapi.Server();
server.connection({
    host: 'localhost',
    port: 8000
});

var swaggerOptions = {
    info: {
        'title': 'API Documentation',
        'version': Pack.version
    }
};

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

// Register Inert
server.register(Inert, function (err) {
    if (err) {
        throw err;
    }
});

server.register([
    Inert,
    Vision,
    {
        register: HapiSwagger,
        options: swaggerOptions
    }], function (err) {
    if (err) {
        throw err;
    }
});

server.register({
    register: require('good'),
    options: goodOptions
}, function (err) {

    if (err) {
        throw err;
    }
});


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

// Add the route
server.route({
    method: 'GET',
    path: '/hello',
    handler: function (request, reply) {

        return reply('hello world');
    }
});

// Static Directory Route
server.route({
    method: 'GET',
    path: '/{param*}',
    handler: {
        directory: {
            path: __dirname + '/public'
        }
    }
});

// Start the server
server.start((err) => {

    if (err) {
        throw err;
    }
    console.log('Server running at:', server.info.uri);
});