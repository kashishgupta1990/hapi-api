var mongoose = require('mongoose');
var path = require('path');
var fs = require('fs');

module.exports = exports = (callback)=> {
    // Connect Methods
    let db = mongoose.connection;
    let daoStructureProcessed = false;
    let connectMongodb = (delay, callback)=> {
        var dbInterval = setTimeout(()=> {
            mongoose.connect(process.env.MONGODB_URL, {
                server: {
                    poolSize: process.env.MONGODB_POOL_SIZE,
                    auto_reconnect: true
                }
            }, (err)=> {
                if (err) {
                    callback(err, null);
                } else {
                    clearTimeout(dbInterval);
                    callback(null, 'MongoDB Successfully Connected');
                }
            });
        }, delay);
    };

    // Database Events
    db.on('connecting', function () {
        console.log('Trying to connect mongoDB server.');
    });
    db.on('error', function (error) {
        console.error('Error In MongoDB Connection: ' + error);
        mongoose.disconnect();
    });
    db.on('connected', function () {
        console.log('MongoDB Connected Successfully.');
        let schemaDirPath = path.join(process.env.PWD, 'dao', 'schema');
        let modules = {};
        if (!daoStructureProcessed) {
            fs.readdir(schemaDirPath, (error, fileList)=> {
                fileList.forEach((fileName)=> {
                    var modelName = fileName.replace(/.js/, '');
                    var schemaObject = require(path.join(schemaDirPath, fileName));
                    var schema = mongoose.Schema(schemaObject.schema);
                    schemaObject.modelMethods.forEach((modelMethods)=> {
                        schema.methods[modelMethods.name] = modelMethods.action;
                    });
                    Object.defineProperty(modules, modelName, {
                        enumerable: false,
                        configurable: false,
                        writable: false,
                        value: mongoose.model(modelName, schema)
                    });
                });
                globalSet('Model', modules);
                daoStructureProcessed = true;
            });
        }
    });
    db.on('reconnected', function () {
        console.log('MongoDB Reconnected.');
    });
    db.on('disconnected', function () {
        console.log('MongoDB Disconnected!');
        connectMongodb(process.env.MONGODB_RECONNECT_DELAY, (err, message)=> {
            console.log(err || message);
        });
    });

    // If the Node process ends, close the Mongoose connection
    process.on('SIGINT', function () {
        mongoose.connection.close(function () {
            console.log('Mongoose default connection disconnected through app termination');
            process.exit(0);
        });
    });
    connectMongodb(0, callback);
};