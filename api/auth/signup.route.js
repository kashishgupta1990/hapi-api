"use strict";

var Joi = require('joi');
var path = require('path');
var db = {
    user: requireFile('db/modules/User')
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
            auth: false,
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
                db.user.signUpUser(dbPayload,(err,data)=>{
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