const dotenv = require('dotenv');
const axios = require('axios');
const qhse_calculations = require('./../helpers/qhse_calculations.js');

// Get config vars
dotenv.config();


module.exports = function (req){
    let indicators = [
        {
            code : 'EG.ELC.COAL.ZS',
            value : null,
            name : '',
            norm : null,
            weight : 3,
            prescoring : null
        },
        {
            code : 'EG.IMP.CONS.ZS',
            value : null,
            name : '',
            norm : null,
            weight : 3,
            prescoring : null
        },
        {
            code : 'EG.EGY.PRIM.PP.KD',
            value : null,
            name : '',
            norm : null,
            weight : 3,
            prescoring : null
        },
        {
            code : 'EG.USE.PCAP.KG.OE',
            value : null,
            name : '',
            norm : null,
            weight : 3,
            prescoring : null
        },
        {
            code : 'EG.USE.COMM.FO.ZS',
            value : null,
            name : '',
            norm : null,
            weight : 3,
            prescoring : null
        },
        {
            code : 'EG.ELC.RNEW.ZS',
            value : null,
            name : '',
            norm : null,
            weight : 3,
            prescoring : null
        }
    ];
    return new Promise((resolve,rejected)=>{

        if(req.query.date !== 'undefined' && req.query.country !== 'undefined'){
            let link_env = `http://api.worldbank.org/v2/country/${req.query.country}/indicator/EG.ELC.COAL.ZS;EG.IMP.CONS.ZS;EG.EGY.PRIM.PP.KD;EG.USE.PCAP.KG.OE;EG.USE.COMM.FO.ZS;EG.ELC.RNEW.ZS?format=json&source=75&date=2000:${req.query.date}`;
            axios.get(link_env)
            .then(response => {
                let data = response.data;
                // console.log(response.data[1]);
                    
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
