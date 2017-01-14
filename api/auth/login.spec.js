// Setup Node Env
require('dotenv').config();
require(`${process.env.PWD}/modules/coreComponents/validateEnv`)();
require(`${process.env.PWD}/modules/coreComponents/globalMethod`)();
var request = require('request-json');
var url = `http://localhost:${process.env.PORT}`;
var client = request.createClient(url);
var apis = require('./login.route');

// TestCase Execution
describe(`Login API: `, ()=> {

    apis.forEach((api)=> {
        let describeString = `Route: ${api.method} ${api.path} `;
        describe(describeString, ()=> {

            // If user login
            it("Login Successfully", function (done) {
                let payload = {
                    "email": "kashish@gmail.com",
                    "password": "pioneerpioneer"
                };
                client.post(api.path, payload, function (error, response, body) {
                    expect(response.statusCode).toBe(200);
                    expect(body.status).toBe(true);
                    expect(body.message).toBe('successfully login');
                    done();
                });
            });

            // If login failed
            it("Login Failed", function (done) {
                let payload = {
                    "email": "kashish@gmail.com",
                    "password": "pioneerpioneerr"
                };
                client.post(api.path, payload, function (error, response, body) {
                    expect(response.statusCode).toBe(200);
                    expect(body.status).toBe(false);
                    done();
                });
            });

        });
    });
});
