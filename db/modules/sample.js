'use strict';

module.exports = {
    saveSample: (callback)=> {

        var sData = new Model.Sample({
            sampleData:'s1',
            sampleItem:'s2'
        });

        sData.M1();
        sData.save(callback);
    },
    getSample: (callback)=> {
        Model.Sample.find({},callback);
    }
};