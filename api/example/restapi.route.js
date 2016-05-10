"use strict";

var Joi = require('joi');
var path = require('path');
var dao = {
  sample:require(path.join(global._APP_DIR,'dao','modules','sample','sample'))
};

//Routs Lists
module.exports = [
    {
        path: '/rest/example/test',
        method: ['GET', 'POST', 'PUT', 'DELETE'],
        config: {
            description: 'REST API in one go',
            notes: 'Yes, I am doing some fun..',
            tags: ['api'],
            plugins :{'hapi-role-manager':['user']},
            handler: (request, reply)=> {

                dao.sample.saveSample((err,data)=>{
                    console.log('Data > ',data);
                });

                reply({status: 'Testing my REST API'});
            }
        }
    }
];