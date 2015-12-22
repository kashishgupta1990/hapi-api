"use strict";

var Joi = require('joi');
var path = require('path');
var dao = {
  user:require(path.join(global._APP_DIR,'dao','modules','User'))
};

//Routs Lists
module.exports = [
    {
        path: '/api/user',
        method: ['POST'],
        config: {
            description: 'Save user information',
            notes: 'Save user information',
            tags: ['api'],
            validate:{
                payload:{
                    firstName:Joi.string(),
                    lastName:Joi.string(),
                    age:Joi.number()
                }
            },
            handler: (request, reply)=> {
                dao.user.saveUser(request.payload,(err,data)=>{
                    if(err){
                        reply(err);
                    }else{
                        reply(data);
                    }
                });

            }
        }
    }
];