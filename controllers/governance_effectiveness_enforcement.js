const dotenv = require('dotenv');
const axios = require('axios');
const qhse_calculations = require('./../helpers/qhse_calculations.js');

// Get config vars
dotenv.config();

module.exports = function (req){
    let indicators = [
        {
            code : 'GE.NO.SRC',
            value : null,
            name : '',
            norm : null,
            weight : 5,
            prescoring : null
        },
        {
            code : 'GE.PER.RNK',
            value : null,
            norm : null,
            name : '',
            weight : 5,
            prescoring : null
        },
        {
            code : 'GE.PER.RNK.LOWER',
            value : null,
            norm : null,
            weight : 5,
            name : '',
            prescoring : null
        },
        {
            code : 'GE.PER.RNK.UPPER',
            value : null,
            norm : null,
            weight : 5,
            name : '',
            prescoring : null
        },
        {
            code : 'RQ.EST',
            value : null,
            norm : null,
            weight : 5,
            name : '',
            prescoring : null
        },
        {
            code : 'RQ.NO.SRC',
            value : null,
            norm : null,
            weight : 5,
            name : '',
            prescoring : null
        },
        {
            code : 'RQ.PER.RNK',
            value : null,
            norm : null,
            weight : 5,
            name : '',
            prescoring : null
        },
        {
            code : 'RQ.PER.RNK.LOWER',
            value : null,
            norm : null,
            weight : 5,
            name : '',
            prescoring : null
        },
        {
            code : 'RQ.PER.RNK.UPPER',
            value : null,
            norm : null,
            weight : 5,
            name : '',
            prescoring : null
        },
        {
            code : 'RQ.STD.ERR',
            value : null,
            norm : null,
            weight : 5,
            name : '',
            prescoring : null
        }

    ];
    return new Promise((resolve,rejected)=>{

        if(req.query.date !== 'undefined' && req.query.country !== 'undefined'){
            let link_env = `http://api.worldbank.org/v2/country/${req.query.country}/indicator/GE.NO.SRC;GE.PER.RNK;GE.PER.RNK.LOWER;GE.PER.RNK.UPPER;RQ.EST;RQ.NO.SRC;RQ.PER.RNK;RQ.PER.RNK.LOWER;RQ.PER.RNK.UPPER;RQ.STD.ERR?format=json&source=3&date=2000:${req.query.date}`;
            axios.get(link_env)
            .then(response => {
                let data = response.data;
                    
                    resolve({code:200,message:qhse_calculations(response.data[1],req.query.date,indicators)});
            })
            .catch(error => {
                resolve({code:400,message:error});
            });
        }else{
            resolve({code:400,message:'Please enter all parameters'});
        }
        //
        //
        //
        
        
    });
}
