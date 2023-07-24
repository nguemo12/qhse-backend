const dotenv = require('dotenv');
const axios = require('axios');
const qhse_calculations = require('./../helpers/qhse_calculations.js');

// Get config vars
dotenv.config();

module.exports = function (req){
    let indicators = [
        {
            code : 'EN.ATM.CO2E.PC',
            value : null,
            name : '',
            norm : null,
            weight : 10,
            prescoring : null
        },
        {
            code : 'EN.CLC.GHGR.MT.CE',
            value : null,
            norm : null,
            name : '',
            weight : 10,
            prescoring : null
        },
        {
            code : 'EN.ATM.METH.PC',
            value : null,
            norm : null,
            weight : 10,
            name : '',
            prescoring : null
        },
        {
            code : 'EN.ATM.NOXE.PC',
            value : null,
            norm : null,
            weight : 10,
            name : '',
            prescoring : null
        },
        {
            code : 'EN.ATM.PM25.MC.M3',
            value : null,
            norm : null,
            weight : 10,
            name : '',
            prescoring : null
        }
    ];
    return new Promise((resolve,rejected)=>{

        if(req.query.date !== 'undefined' && req.query.country !== 'undefined'){
            let link_env = `http://api.worldbank.org/v2/country/${req.query.country}/indicator/EN.ATM.CO2E.PC;EN.CLC.GHGR.MT.CE;EN.ATM.METH.PC;EN.ATM.NOXE.PC;EN.ATM.PM25.MC.M3?format=json&source=75&date=2000:${req.query.date}`;
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
