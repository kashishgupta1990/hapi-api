"use strict";

var sampleModel = {
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

console.log('Yoooo ',global.Model);

// Schema
module.exports = sampleModel;



