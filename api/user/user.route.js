"use strict";

var Joi = require('joi');
var path = require('path');
var dao = {
    User: require(path.join(global._APP_DIR, 'dao', 'modules', 'User'))
};

//Routs Lists
module.exports = [
    {
        path: '/api/v1/user/{id?}',
        method: ['GET'],
        config: {
            description: 'Fetch user detail',
            notes: 'Fetch user detail',
            tags: ['api'],
            validate: {
                params: {
                    id: Joi.string()
                }
            },
            handler: (request, reply)=> {
                if (request.params.id) {
                    dao.User.showUserById({id: request.params.id}, (err, data)=> {
                        if (err) {
                            return reply({
                                status: false,
                                data: err,
                                message: 'Some error occure'
                            });
                        } else {
                            return reply({
                                status: true,
                                data: data,
                                message: 'User successfully found.'
                            });
                        }
                    });

                } else {
                    dao.User.showAllUser({},(err,data)=>{
                        if (err) {
                            return reply({
                                status: false,
                                data: err,
                                message: 'Some error occure'
                            });
                        }else{
                            return reply({
                                status:true,
                                data: data,
                                message: 'All user data fetched'
                            });
                        }
                    });
                }
            }
        }
    },
    {
        path: '/api/v1/user',
        method: ['POST'],
        config: {
            description: 'Add new User',
            notes: 'Add new User',
            tags: ['api'],
            validate: {
                payload: {
                    name: Joi.string().required(),
                    age: Joi.number().required()
                }
            },
            handler: (request, reply)=> {
                let newuser = new Model.User(request.payload);
                newuser.save((err, data)=>{
                    if(err){
                        return reply({
                            status: false,
                            data: err,
                            message: 'Some error occure'
                        });
                    }else{
                        return reply({
                            status:true,
                            data: data,
                            message: 'User successfully added'
                        });
                    }
                });
            }
        }
    },
    {
        path: '/api/v1/user/{id}',
        method: ['PUT'],
        config: {
            description: 'Fetch user detail',
            notes: 'Fetch user detail',
            tags: ['api'],
            validate: {
                params: {
                    id: Joi.string()
                },
                payload: {
                    name: Joi.string(),
                    age: Joi.number()
                }
            },
            handler: (request, reply)=> {
                let payload = request.payload;
                payload.id = request.params.id;
                dao.User.update(payload,(err, data)=>{
                    if(err){
                        return reply({
                            status: false,
                            data: err,
                            message: 'Some error occure'
                        });
                    }else{
                        return reply({
                            status:true,
                            data: data,
                            message: 'User successfully updated'
                        });
                    }
                });
            }
        }
    },
    {
        path: '/api/v1/user/{id}',
        method: ['DELETE'],
        config: {
            description: 'Delete user',
            notes: 'Delete user',
            tags: ['api'],
            validate: {
                params: {
                    id: Joi.string()
                }
            },
            handler: (request, reply)=> {
                dao.User.remove({id:request.params.id},(err, data)=>{
                    if(err){
                        return reply({
                            status: false,
                            data: err,
                            message: 'Some error occure'
                        });
                    }else{
                        return reply({
                            status:true,
                            data: data,
                            message: 'User successfully removed'
                        });
                    }
                });
            }
        }
    }
];