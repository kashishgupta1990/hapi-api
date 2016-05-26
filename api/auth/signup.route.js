"use strict";

var Joi = require('joi');
var path = require('path');
var dao = {
    user: require(path.join(global._APP_DIR, 'dao', 'modules', 'User'))
};

//Routs Lists
module.exports = [
    {
        path: '/api/v1/auth/signup',
        method: ['POST'],
        config: {
            description: 'SignUp Here',
            notes: 'SignUp here',
            tags: ['api'],
            validate: {
                payload: {
                    email: Joi.string().email().required(),
                    password: Joi.string().min(8).max(16).required()
                }
            },
            plugins: {
                'hapi-auth-cookie': {
                    redirectTo: false
                }
            },
            handler: function (request, reply) {
                var dbPayload = {
                    email: request.payload.email,
                    password: request.payload.password
                };
                dao.user.signUpUser(dbPayload,(err,data)=>{
                    if(err){
                        reply(err);
                    }else{
                        reply({
                            status:true,
                            message:'User Successfully Register',
                            data:{
                                email:data.email,
                                roles:data.roles
                            }
                        });
                    }
                });
            }
        }
    }
];