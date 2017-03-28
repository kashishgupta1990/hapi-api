'use strict';

// Setup Node Env
require('dotenv').config();
require('./modules/coreComponents/validateEnv')();
require('./modules/coreComponents/globalMethod')();

// Variables
var Hapi = require('hapi');
var fs = require('fs');
var async = require('async');
var path = require('path');
var gmailNode = require('gmail-node');
var serverTasks = [];

// Create a server with a host and port
var server = new Hapi.Server();
server.connection({
    port: +process.env.PORT,
    routes: {
        cors: process.env.ALLOW_CROSS_DOMAIN === 'true' ? true : false
    }
});

// MongoDB Connection
serverTasks.push((callback)=> {
    require('./modules/coreComponents/mongodbConnection')(callback);
});

// Plugin Registration Operations
serverTasks.push((callback)=> {
    require('./modules/coreComponents/hapiPlugin')(server, callback);
});

// Gmail Node Configuration
serverTasks.push((callback)=> {
    let gmailConfig = {
        "installed": {
            "client_id": process.env.GMAIL_CLIENT_ID,
            "project_id": process.env.GMAIL_PROJECT_ID,
            "auth_uri": process.env.GMAIL_AUTH_URL,
            "token_uri": process.env.GMAIL_TOKEN_URL,
            "auth_provider_x509_cert_url": process.env.GMAIL_AUTH_PROVIDER_X509_CERT_URL,
            "client_secret": process.env.GMAIL_CLIENT_SECRET,
            "redirect_uris": [
                process.env.GMAIL_REDIRECT_URIS_INDEX1,
                process.env.GMAIL_REDIRECT_URIS_INDEX2
            ]
        }
    };
    appSet('gmail', gmailNode);
    gmailNode.init(gmailConfig, './token.json', callback);
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
    applyRouteConfig(__dirname + '/serverTemplates');
    callback(null, 'Routes config successsfully');
});

// Global Module Event Register
serverTasks.push((callback)=> {
    require('./modules/coreComponents/globalEventRegister')(callback);
});

//Running Bootstrap Task
serverTasks.push(function (callback) {
    require('./modules/coreComponents/bootstrap')(callback);
});

// Start the server
async.series(serverTasks, (err, result)=> {
    if (err) {
        console.error('Error on Server Start ', err);
        throw err;
    } else {
        server.start((err) => {
            if (err) {
                console.error(err);
                throw err;
            } else {
                console.log('Environment: ', process.env.ENV_NAME);
                console.log('Server running at:', server.info.uri);
            }
        });
    }
});