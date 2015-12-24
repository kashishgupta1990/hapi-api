"use strict";

var Joi = require('joi');
var path = require('path');
var dao = {
  user:require(path.join(global._APP_DIR,'dao','modules','User'))
};

//Routs Lists
module.exports = [
    {
        path: '/api/user/{firstName}',
        method: ['GET'],
        config: {
            description: 'Get user information',
            notes: 'Get user information',
            tags: ['api'],
            plugins :{'hapi-role-manager':['user','admin']},
            validate:{
              params:{
                  firstName:Joi.string()
              }
            },
            handler: (request, reply)=> {
                dao.user.getUser({firstName:request.params.firstName},(err,data)=>{
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