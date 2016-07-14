"use strict";

var Joi = require('joi');
var path = require('path');
var JWT   = require('jsonwebtoken');
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
            auth: false,
            validate:{
                payload:{
                    email:Joi.string().email().required(),
                    password:Joi.string().min(8).max(16).required()
                }
            },
            plugins: {
                'hapi-swagger': {
                    responses: {
                        '200': {
                            'description': 'Success',
                            'schema': Joi.object({
                                status:true,
                                message:'Successfully Login'
                            }).label('Result')
                        },
                        '400': {'description': 'Bad Request'}
                    },
                    payloadType: 'json'
                }
            },
            handler: function (request, reply) {

                var dbPayload = {
                    email: request.payload.email,
                    password: request.payload.password
                };
                dao.user.validateUser(dbPayload, (err, data)=>{
                    if(err){
                        reply(err);
                    }else{
                        if(data){
                            let userData = {
                                email:data.email
                            };
                            let token = JWT.sign(userData, global._APP_CONFIG.jwt.key);

                            reply({
                                status:true,
                                message:'successfully login',
                                data:{
                                    email:data.email
                                }
                            }).header("Authorization", token);
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