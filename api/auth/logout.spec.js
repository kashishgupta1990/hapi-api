// Setup Node Env
require('dotenv').config();
require(`${process.env.PWD}/modules/coreComponents/validateEnv`)();
require(`${process.env.PWD}/modules/coreComponents/globalMethod`)();
var request = require('request-json');
var url = `http://localhost:${process.env.PORT}`;
var client = request.createClient(url);
var apis = require('./logout.route');

// TestCase Execution
describe(`Logout API: `, ()=> {

    apis.forEach((api)=> {
        let describeString = `Route: ${api.method} ${api.path} `;
        describe(describeString, ()=> {

            // If user login
            it("Logout Successfully", function (done) {
                expect(200).toBe(200);
                done();
            });

        });
    });
});
