var path = require('path');
var fs = require('fs');
var EventEmitter = require("events").EventEmitter;

module.exports = exports = (callback)=> {
    var _globalEvent = new EventEmitter();
    function createEmitterEvent(eventList) {
        eventList.forEach(function (event) {
            _globalEvent.on(event.eventName, event.handler);
        });
    }
    function applyEmitterBind(dirPath) {
        var dirName = dirPath;
        var data = fs.readdirSync(dirName);
        data.forEach(function (dta) {
            var path = dirName + '/' + dta;
            if (fs.lstatSync(path).isDirectory()) {
                applyEmitterBind(path);
            } else {
                createEmitterEvent(require(path));
            }
        });
    }
    applyEmitterBind(process.env.PWD + '/modules/globalEvent');
    globalSet('GlobalEvent', _globalEvent);
    callback(null, 'Global Event Binding Complete');
};