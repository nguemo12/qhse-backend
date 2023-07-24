const dotenv = require('dotenv');
const axios = require('axios');
const qhse_calculations = require('./../helpers/qhse_calculations.js');

// Get config vars
dotenv.config();

module.exports = function (req){
    let indicators = [
        {
            code : 'EN.CLC.CDDY.XD',
            value : null,
            name : '',
            norm : null,
            weight : 10,
            prescoring : null
        },
        {
            code : 'EN.CLC.HEAT.XD',
            value : null,
            norm : null,
            name : '',
            weight : 10,
            prescoring : null
        },
        {
            code : 'EN.POP.DNST',
            value : null,
            norm : null,
            weight : 10,
            name : '',
            prescoring : null
        }
    ];
    return new Promise((resolve,rejected)=>{

        if(req.query.date !== 'undefined' && req.query.country !== 'undefined'){
            let link_env = `http://api.worldbank.org/v2/country/${req.query.country}/indicator/EN.CLC.CDDY.XD;EN.CLC.HEAT.XD;EN.POP.DNST?format=json&source=75&date=2000:${req.query.date}`;
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
