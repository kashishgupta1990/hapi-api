**Table of Contents**
- [Hapi Mongoose Boilerplate](#Hapi-Mongoose-Boilerplate)
  - [Installation](#installation)
    - [Download (git)](#download-git)
    - [NPM Install (npm)](#npm-install)
  - [Boilerplate Structure](#boilerplate-structure)
  - [Setting up configration](#setting-up-configration)
    - [Bootstrap.js](#bootstrap.js)
    - [Config.json](#Config.json)
    - [plug.json](#plug.json)
  - [Mongoose Domain and Modal](#mongoose-domain-n-modal)
    - [mongooseDomain](#mongoose-domain)
      - [Define User Domain](#define-user-domain)
      - [User Modal](#user-modal)
  - [How to define Routes ](#how-to-define-routes)
    - [Route](#route)
  - [Lets Build Together](#lets-build-together)
  - [Revision History](#revision-history)


#Hapi Mongoose Boilerplate #

This Boilerplate is ready to use pack having very exciting feature of HapiJs and MongooseJs. 

This Boilerplate having some of common plugin which can be used as per required.

This boilerplate will give you a quick start to your Node Application Server with HapiJs.

We are Hapi to release this exciting version to build your Node app on Hapi-Mongoose-Boilerplate.

##Installation##
This library is available for **Node** only. See the installation steps below:

###Download(GIT)###
```bash
$ git clone git@github.com:kashishgupta1990/HapiMongooseBoilerplate.git
```
###NPM Install(npm)###
```bash
$ npm install
$ node app.js (By Default you can see server running on Address http://localhost:7002)
```
##Boilerplate Structure##

  - api
    - CreateFolder(login)
      - FileName.route.js (login.route.js)
      - FileName.service.js (login.service.js)
      - CreateFolder (You can make sub-nesting folder..)
          - FileName.route.js (So on ..)
          - FileName.service.js (So on ..)
    - CreateFolder (So on ..)
      - FileName.route.js (So on ..)
      - FileName.service.js (So on ..)
  - config
    - Bootstrap.js
    - Config.json
  - custom_modules
    - custom-imagemim-log
    - global-utility
    - hapi-role-manager
    - mongooseAuto
  - globalEvent
    - FileName.js
    - OneMoreFileName.js
    - So on...
  - mongooseDomain
    - SampleModel.js
    - User.js
    - add more models yourself ...
  - node_modules 
    - contains all the dependency ...
  - public (Contain all public folder)
    - index.html 
    - css
    - So on..
  - sharedService
    - FileName.js
    - FolderName
      - FileName.service.js
      - So on...
    - more files ..
    - more folders ..
  - app.js (main file of the project)
  
##Setting up configuration (Folder: config)##
###Bootstrap.js###
``Bootstrap.js`` is a task runner file which executes on start of application according to appropriate environment settings.
See below given snippet for quick start to create task named ``Test`` and run on ``development`` environment
```javascript
module.exports = function (environment, callback) {

    //Add your task name here
    var env = {
        "development": [Test]
    };

    //Create your task like function
    function Test(callback) {
        log.cool('Test Task Runner');
        callback(null, 'Test Task Runner')
    }
    
};
```

###Config.json###
``Config.json`` contains all the application level configuration variables. Use config.json file by ``_config`` as global variable.
```javascript
"development": {
    "server": {
      "host": "localhost",
      "port": "7002",
      "allowCrossDomain": true
    },
    "database": {
      "url": "mongodb://localhost:27017/boilerplate",
      "poolSize": 5,
      "tryToConnect": true
    },
    "cookie": {
      "password": "secret",
      "cookie": "hm-boilerplate",
      "redirectTo": "/login",
      "isSecure": false
    }
  }
```

##Mongoose Domain and Modal##

###mongooseDomain###
``mongooseDomain`` is a home for all mongoose domain. You just have to create file like ``User.js``, define mongoose schema into file, that's all.
You can access your mongoose modal form any where in boilerplate (routes, bootstarp files) by ``Modal`` object.
Examples are given below:

####Define User Domain####
``Define User Domain`` in /mongooseDomain/User.js
```javascript
"use strict";

//Define User Schema
//Refer: http://mongoosejs.com/docs/schematypes.html
module.exports = {
    username: String,
    password: String
};
```
####User Modal####
Use ``User Modal`` any where from routs / bootstrap
```javascript
//Save New User
new Modal.User({
      username: "admin",
      password: "admin"
    }).save(function (err, result) {
               if (err) {
                  log.error("Error Save Record: " + err);
               } else {
                  log.cool('User Save Successfully');
               }
       })

//Get User
Modal.User.find({username: 'admin'}, function (err, data) {
            if (err) {
                log.error(err);
            } else {
                log.cool(data);
            }
})
```
##How to define Routes##

###Route###
``route`` is a folder where we can define routs. Create folder in side route folder or you can directly create file with any name we want. File should follow this type of syntax. Here you can write handlers in ``Javascript ECMAScript-6`` syntax like below.
```javascript
"use strict";
var Joi = require('joi');
//Routs Lists
module.exports = [
    {
        path: '/sample/test/special',
        method: 'GET',
        config: {
            description: 'Get Test-1',
            notes: 'Yes, I am doing testing',
            tags: ['api'],
            handler: (request, reply)=> {
                reply({status: 'my ecma6 special reply'});
            }
        }
    },
    {
        path: '/sample/test/test2',
        method: ['GET', 'POST'],
        config: {
            description: 'Get Test-2',
            notes: 'Yes, I am doing testing',
            tags: ['api'],
            handler: function (request, reply) {
                reply({status: 'I am Test-2 API'});
            }
        }
    },
    {
        //Here you can add more routs (Hapi Syntax)
        //Refer: http://hapijs.com/tutorials/routing
    }
];
```

##Lets Build Together##
Just open an issue in case found any bug(There is always a scope of improvement). We are always open for suggestion / issue / add new feature request. Fork and start creating pull request. :-)

##Revision History##
* **Version v0.1.0**: The second poc release v0.1.0.
