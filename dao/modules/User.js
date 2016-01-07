'use strict';

module.exports = {
    signUpUser: (data, callback)=> {
        /*
        * email:yoman@gmail.com,
        * password:*******,
        * roles:['user']
        * */
        var uData = new Model.User(data);
        uData.save(callback);
    },
    validateUser: (data, callback)=> {
        /*
        * email:yoman@gmail.com,
        * password:********,
        * roles:['user']
        * */
        Model.User.findOne(data,callback);
    }
};