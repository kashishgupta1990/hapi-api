"use strict";

var Joi = require('joi');
var path = require('path');
var dao = {
    user:require(path.join(global._APP_DIR,'dao','modules','User'))
};

//Routs Lists
module.exports = [
    {
        path: '/api/v1/auth/login',
        method: ['POST'],
        config: {
            description: 'Login Here',
            notes: 'Do login here',
            tags: ['api'],
            validate:{
                payload:{
                    email:Joi.string().email().required(),
                    password:Joi.string().min(8).max(16).required()
                }
            },
            plugins: {
                'hapi-auth-cookie': {
                    redirectTo: false
                },
                'hapi-role-manager':['user']
            },
            handler: function (request, reply) {
                var dbPayload = {
                    email: request.payload.email,
                    password: request.payload.password
                };
                dao.user.validateUser(dbPayload,(err,data)=>{
                    if(err){
                        reply(err);
                    }else{
                        if(data){
                            //To Authenticate User
                            request.auth.session.set({
                                roles: data.roles,
                                email:data.email
                            });
                            reply({
                                status:true,
                                message:'successfully login',
                                data:{
                                    roles: data.roles,
                                    email:data.email
                                }
                            });
                        }else{
                            reply({
                                status:false,
                                message:'Invalid User or Password',
                                data:{}
                            });
                        }
                    }
                });
            }
        }
    }
];