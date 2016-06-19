module.exports = [
    {
        eventName: 'defaultEmailNotification',
        handler: function (data, callback) {
            global.gmail.send(data, callback);
        }
    }
];
