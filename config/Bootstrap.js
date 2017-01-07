"use strict";

var async = require('async');

module.exports = function (environment, callback) {

    // Tasks
    function Test(callback) {
        var mailOptions = {
            to: "guptkashish@gmail.com", // list of receivers
            subject: "test-1 ", // Subject line
            message: "test-2: "
        };
        GlobalEvent.emit('defaultEmailNotification',mailOptions, callback);
    }

    //Task Template to create more task
    function YourTaskName(callback) {
        // ADD YOUR LOGIC HERE..
        // SO ON..
        callback(ERROR_MESSAGE, SUCCESS_MESSAGE)
    }

    var task = [Test];
    async.series(task, function (err, result) {
        console.log('Booting process completed.');
        callback(err, result);
    });
};

