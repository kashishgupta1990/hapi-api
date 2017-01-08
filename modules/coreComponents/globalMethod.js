// GLOBAL object bindings.
var path = require('path');
var __globalData = {};
// Private Method
var __protectGlobalObject = (objectName, key, value)=> {
    // being explicit
    Object.defineProperty(objectName, key, {
        enumerable: false,
        configurable: false,
        writable: false,
        value: value
    });
};
var methodList = [
    {
        keyName: 'requireFile',
        action: (filePath)=> {
            try{
                let completePath = path.join(process.env.PWD, filePath);
                return require(completePath);
            }catch(e){
                return require(filePath);
            }
        }
    },
    {
        keyName: 'globalSet',
        action: (key, value)=>{
            __protectGlobalObject(global, key, value);
        }
    },
    {
        keyName: 'appGet',
        action: (key)=>{
            return __globalData[key];
        }
    },
    {
        keyName: 'appSet',
        action: (key, value)=>{
            __protectGlobalObject(__globalData, key, value);
        }
    }
];

module.exports = exports = ()=> {

    let init = ()=> {
        methodList.forEach((obj)=>{
            __protectGlobalObject(global, obj.keyName, obj.action)
        });
    };
    init();
};