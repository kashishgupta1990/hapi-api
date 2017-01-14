module.exports = [
    {
        eventName: 'defaultEmailNotification',
        handler: function (data, callback) {
            appGet('gmail').send(data, callback);
        }
    }
];
