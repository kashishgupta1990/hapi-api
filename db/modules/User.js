'use strict';

var UserModule = {
    signUpUser: (data, callback)=> {
        /*
         * email:yoman@gmail.com,
         * password:*******,
         * */

        // Check existing user
        UserModule.validateUser(data, (err, result)=> {
            if (err) {
                callback(err, null);
            } else {
                if (!result) {
                    var uData = new Model.User(data);
                    console.log(uData.save);
                    uData.save(callback);
                } else {
                    callback({
                        status: false,
                        message: 'emailId already in use',
                        data:{
                            email:data.email
                        }
                    }, null);
                }
            }
        });
    },
    validateUser: (data, callback)=> {
        /*
         * email:yoman@gmail.com,
         * password:********
         * */
        Model.User.findOne(data, callback);
    }
};

module.exports = UserModule;