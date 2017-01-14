module.exports = [
    {
        eventName: 'someEvent',
        handler: function (data) {
            console.log("some event occure ",data);
        }
    },
    {
        eventName: 'someMoreEvent',
        handler: function () {
            console.log("some more event occure");
        }
    }
];
