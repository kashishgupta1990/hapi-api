'use strict';

module.exports = {
    saveUser: (data, callback)=> {

        var uData = new Model.User({
            firstName:data.firstName,
            lastName:data.lastName,
            age:data.age
        });
        uData.save(callback);
    },
    getUser: (data, callback)=> {
        Model.User.find({firstName:data.firstName},callback);
    }
};