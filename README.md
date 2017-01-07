# Table of Contents #

- [Hapi Api Boilerplate](#Hapi-Api-Boilerplate)
  - [Installation](#installation)
    - [Download (git)](#download-git)
    - [NPM Install (npm)](#npm-install)
  - [Boilerplate Structure](#boilerplate-structure)
  - [Setting up configuration](#setting-up-configration)
    - [Bootstrap.js](#bootstrap.js)
    - [Config.json](#Config.json)
    - [plug.json](#plug.json)
  - [Mongoose Domain and Modal](#mongoose-domain-n-modal)
    - [mongooseDomain](#mongoose-domain)
      - [Define User Domain](#define-user-domain)
      - [User Modal](#user-modal)
  - [How to define Routes ](#how-to-define-routes)
    - [Route](#route)
  - [Cloud Platform Support](#cloud-platform-support)
  - [Docker Support](#docker-support)
  - [Lets Build Together](#lets-build-together)

# Hapi Api Boilerplate #

This Boilerplate is ready to use pack having very exciting feature of HapiJs and MongooseJs. 
This Boilerplate having some of common plugin which can be used as per required. 
This Boilerplate will give you a quick start to your Node Application Server with HapiJs.
We are Hapi to release this exciting version to build your Node app on Hapi-Api-Boilerplate. 
It's by default gives you the `ToDoApplication` API's. It will help you to understand and build your own API's.


## When run this boilerplate first time, it will ask for auth key of GMail notification integration and send you email on application start. Update the `Bootstrap.js` `Test` Task.
### How to create gmail secret key and update the `/config/Config.json` gmail object credentials  
- Open link https://console.developers.google.com/flows/enableapi?apiid=gmail
- Use this wizard to create or select a project in the Google Developers Console and automatically turn on the API. 
- Click Continue, then Go to credentials.
- At the top of the page, select the OAuth consent screen tab. Select an Email address, enter a Product name if not already set, and click the Save button.
- Select the Credentials tab, click the Create credentials button and select OAuth client ID.
- Select the application type Other, enter the any name "gmail-node-app", and click the Create button.
- Click OK to dismiss the resulting dialog.
- Click the file_download (Download JSON) button to the right of the client ID.
- Copy the file data from from Downloaded JSON and update the `/config/Config.json` file.


#### Try Now [To-Do-List Application Api](http://todoapi.kashishgupta.in/documentation) ####

### Prerequisite ##

- `NodeJs v4.x` and above required.
- `MongoDB Server 3.2.x` and above required.

## Installation ##

This library is available for **Node v4** and above. See the installation steps below:

### Download(GIT) ###
```bash
$ git clone git@github.com:kashishgupta1990/hapi-api.git
```
### NPM Install(npm) ###
```bash
$ npm install
$ node app.js (By Default you can see server running on Address http://localhost:9999)
```

### Build your own project and remove default `ToDoApplication` ###
Execute this command inside your project root directory. This will remove unwanted files which was use for `ToDoApplication`.
```bash
sh reset.sh
```

### Refer Blog for Kick-Start ###
- [Build RESTful API's using HapiApi boilerplate]

### Rename sample.env to .env and update the file.

## Boilerplate Structure ##

  - api
    - CreateFolder(auth)
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
  - dao
    - modules
      - ToDoList.js (It is `M` from `MVC` framework. Containing the ToDoApp model.)
      - User.js (It contain the User model which interact with mongodb.)
    - schema 
      - User.js (Containing ToDoApplication User Schema)
      - Sample.js (Its is just a sample file. Showing the file structure and usage.)
  - globalEvent
    - email.js
    - notification.js (It is just a sample file. Showing the file structure and usage.)
    - So on...
  - node_modules 
    - contains all the dependency ...
  - public (Contain all public folder)
    - index.html 
    - css
    - So on..
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

### Config.json ###

`Config.json` contains all the application level configuration variables. Use config.json file by `_config` as global variable.

```javascript

  "development": {
    "server": {
      "host": "localhost",
      "port": "9999",
      "allowCrossDomain": true
    },
    "database": {
      "required": false,
      "url": "mongodb://localhost:27017/boilerplate",
      "poolSize": 2,
      "tryToConnect": true
    },
    "cookie": {
      "password": "enter-your-32-char-secret-key",
      "cookie": "hapi-api-dev",
      "redirectTo": "/login",
      "isSecure": false
    },
    "jwt":{
          "key":"NeverShareYourSecretNeverShareYourSecret"
    },
    "mail":{
      "gmail":{
           "installed": {
                "client_id": "k677725446467-6li25pcqgkcllsoh6f6dijcvse64n9pf.apps.googleusercontent.com",
                "project_id": "clean-node-119606",
                "auth_uri": "https://accounts.google.com/o/oauth2/auth",
                "token_uri": "https://accounts.google.com/o/oauth2/token",
                "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
                "client_secret": "kF7DvoA_ZrNfa65GnU2zQBgw7",
                "redirect_uris": [
                  "urn:ietf:wg:oauth:2.0:oob",
                  "http://localhost"
                ]
           }
       }
    }
  }
  
```

## DAO (Data Access Object) Schema and its Module ##

### Schema ###

``dao/schema`` is a home for all mongoose domain. You just have to create file like ``User.js``, define mongoose schema into file, that's all.
You can access your mongoose modal form any where in boilerplate (routes, bootstarp files) by ``Modal`` object.
Examples are given below:

#### Define Sample Domain####

``Define Sample Domain`` in /dao/schema/Sample.js
```javascript
"use strict";

//Define Sample Schema
//Refer: http://mongoosejs.com/docs/schematypes.html
var sample = {
    schema: {
        id: Number,
        sampleData: String,
        sampleItem: String
    },
    modelMethods: [
        {
            name: 'M1',
            action: ()=> {
                console.log('I am sample method M1');
            }
        },
        {
            name: 'M2',
            action: ()=> {
                console.log('I am sample method M2');
            }
        }
    ]

};

// Schema
module.exports = sample;
```
#### Sample Modules####

Use ``Define Sample Module`` in /dao/modules/sample.js
```javascript
'use strict';

module.exports = {
    saveSample: (callback)=> {

        // Creating Sample data object
        var sData = new Model.Sample({
            sampleData:'s1',
            sampleItem:'s2'
        });

        // Calling model method
        sData.M1();
        
        // Save into database
        sData.save(callback);
    },
    getSample: (callback)=> {
        Model.Sample.find({},callback);
    }
};
```
##How to define Routes##

### API Route###

``api`` is a folder where we can define routes. Create folder in side `api` folder or you can directly create file with any name we want. File should follow the `*.route.js` notation. Here `*` will be replaced by any `filename`.
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

## Route Authentication Mechanism ##

To authenticate the `API's` here we have used [JSON Web Token]: https://github.com/dwyl/hapi-auth-jwt2, which help us to secure our routes just by adding one field in `route config:{}` object.
which is `auth:"jwt"` to enable the secure route and `auth:false` to disable the routes. Refer the File: `api/toDoList/addTask.route.js`.

- How to create `User Token` at the time of login
First require the package `npm install jsonwebtoken`
```javascript
var JWT   = require('jsonwebtoken');
```

- Sign the Token with same secret key available in `/config/Config.json`. Field: `jwt:'your-secret-key'` 
```javascript
let token = JWT.sign(userData, global._APP_CONFIG.jwt.key);
```

- Setting this key in Response data and response header.
```javascript
reply({
  status:true,
  message:'successfully login',
  data:{
    email:data.email,
    token:token
  }
}).header("Authorization", token);
```

- All the future request raise by client containing with `authorization` header can access `authenticated` `API's`. Try this in `terminal`
```javascript
curl -X GET --header 'Accept: application/json' --header 'authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imthc2hpc2hndXB0YTE5OTBAeWFob28uY29tIiwiaWF0IjoxNDY4OTI2MDY3fQ.FNtiiSkQDSvfG4KZfB6f7MMMjlJ2lNTpLpMYJz83Y1o' 'http://localhost:9999/api/v1/todolist'
```

- Access Token (decoded) Data inside Route Handler
Token generated at the time of `login` should be available in the request header with the `request.tokenData` 
This token contains the user data or what ever you want to save at the time of login. Refer `api/auth/login.route.js`

- Generate & save token Login API Example 
```javascript
var JWT = require('jsonwebtoken');
```

```javascript
{
        path: '/api/v1/auth/login',
        method: ['POST'],
        config: {
            description: 'Login Here',
            notes: 'Do login here',
            tags: ['api'],
            auth: false, // This is use for open route
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
                                    email:data.email,
                                    token:token
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
```

- Access Token Data API
Refer File: `/api/toDoList/addTask.route.js`

```javascript
 {
        path: '/api/v1/todolist',
        method: ['POST'],
        config: {
            description: 'Add new ToDo Task',
            notes: 'Add new ToDo Task',
            tags: ['api'],
            validate: {
                payload: {
                    description: Joi.string().required()
                },
                headers: Joi.object({
                    'authorization': Joi.string().required()
                }).unknown()
            },
            auth: 'jwt', // This is use for auth routes
            handler: (request, reply)=> {
               // Access Secure Token User Data
               console.log('Token Data: ',request.tokenData);
            }
        }
}
```

# Cloud Platform Support #

We support `Heroku` cloud platform as a service (PaaS). It's very easy to deploy on `Heroku` server just update your application `config.json` file with appropriate environment name, server, cookies and database settings. Finally push your code to heroku `master` branch rest will automatically done by `Heroku`.

# Docker Support #

We support `Docker` Container as a service (CaaS). It's very easy to build the `Hapi Api Boilerplate` docker image with updated codebase and run the container on any type production environment.

#### Step-1 Create docker image ####

To create docker image we need to run simple docker command `docker build -t kashishgupta1990/hapiapi . `. Here `kashishgupta1990/hapiapi` is the name of the image you can the change the image name on your own. This command use the `Dockerfile` present in `root` folder of the project and build the `Docker Image` of current project state.
 ```bash
 docker build -t kashishgupta1990/hapiapi .
 ```

#### Step-2 Test the docker container ####

To test the newly created docker image, we need to execute the command `docker run --name "hapiapi" -p 9999:9999  kashishgupta1990/hapiapitest`. This will create `docker container` and you can test your `Docker Image` via just check the server listening on PORT: `9999`. If `YES` then your did well :) 
```bash
docker run --name "hapiapitest" -p 9999:9999  kashishgupta1990/hapiapitest
```
#### Step-3 Execute the docker container on background ####

Run the command to execute on background `docker run -d --name "hapiapi" -p 9999:9999  kashishgupta1990/hapiapitest`
```bash
docker run -d --name "hapiapiprod" -p 9999:9999  kashishgupta1990/hapiapitest
```

#### Step-4 Check the docker container `LOGS` ####

- Check the existing container running on system
```bash
docker ps -a
```
- Select the CONTAINER ID / NAMES (look like -> aea8bf1d2562) and copy it. Run the following command. It will return you container terminal.
```bash
docker exec -it hapiapi /bin/bash
```
```bash
docker exec -it aea8bf1d2562 /bin/bash
```
- Type command: `pm2 logs`
```bash
pm2 logs
```

## Lets Build Together ##

Just open an issue in case found any bug(There is always a scope of improvement). We are always open for suggestion / issue / add new feature request. Fork and start creating pull request. :-)


[Build RESTful API's using HapiApi boilerplate]: http://blog.kashishgupta.in/2016/06/01/kickstart-with-hapi-js-restful-api/
