"use strict";

var userModel = {
    schema: {
        email: String,
        password: String,
        toDoList: {
            type: [{
                description: {
                    type: String,
                    required: true
                },
                completed: {
                    type: Boolean,
                    required: true,
                    default: false
                },
                removed: {
                    type: Boolean,
                    required: true,
                    default: false
                }
            }],
            required: false,
            default: []
        }
    },
    modelMethods: []
};

// Schema
module.exports = userModel;



