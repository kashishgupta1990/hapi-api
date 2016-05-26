"use strict";

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



