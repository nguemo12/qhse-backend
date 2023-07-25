const dotenv = require('dotenv');
const axios = require('axios');
const qhse_calculations = require('./../helpers/qhse_calculations.js');

// Get config vars
dotenv.config();

async function getCountryList(){
    const res = await axios.get('http://api.worldbank.org/v2/country?format=json')
    const data = await res.json()
    console.log(data)
    return data[1];
}

async function getCountryDataFromApi(req,indicators,cb){
    let results = [];
    const country = await getCountryList();

    const selectedCountry = req.query.country;
    const item = country.filter((item=> item.name === selectedCountry))

    const filteredCountry = country.filter((data)=> data.region.value.includes(item[0].region.value))
    

    filteredCountry.forEach(async (item,index)=>{
            let link_env = `http://api.worldbank.org/v2/country/${item?.iso2Code}/indicator/EN.ATM.CO2E.PC;EN.CLC.GHGR.MT.CE;EN.ATM.METH.PC;EN.ATM.NOXE.PC;EN.ATM.PM25.MC.M3?format=json&source=75&date=2000:${req.query.date}`;
            const res = await axios.get(link_env)
            const data = await res.data

            let obj = qhse_calculations(data[1],req.query.date,indicators)
            obj[0]['country'] = item?.name ?? 'Aruba'
           
            results.push(obj)
            if(index === filteredCountry.length-1){
                console.log("Done")
                cb(results)
            }
            
    })
}

async function getAllEmissionData (req){
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

    let error = false;

    if(req.query.date===null){
        error = true;
    }else{

       
        return new Promise((resolve,rejected)=>{
            if(error){
                resolve({code:400,message:'Please enter all parameters'});
            }else{
                getCountryDataFromApi(req,indicators,(result)=>{
                    resolve({code:200,message: result});
                })        
            }
        });
    }
}

module.exports={
    getAllEmissionData
}
