"use strict";

var userModel = {
    schema: {
        email: String,
        password: String,
        roles: [String],
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
            required: true,
            default: []
        }
    },
    modelMethods: []
};

// Schema
module.exports = userModel;



