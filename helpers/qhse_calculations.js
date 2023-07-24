const normInd = require('./normalizer.js');
const data_appreciation = require('./data_appreciation.js');
function findClosest(arr, target)
{
    let n = arr.length;
 
    // Corner cases
    if (target <= arr[0])
        return arr[0];
    if (target >= arr[n - 1])
        return arr[n - 1];
 
    // Doing binary search
    let i = 0, j = n, mid = 0;
    while (i < j)
    {
        mid = (i + j) / 2;
 
        if (arr[mid] == target)
            return arr[mid];
 
        // If target is less than array
        // element,then search in left
        if (target < arr[mid])
        {
      
            // If target is greater than previous
            // to mid, return closest of two
            if (mid > 0 && target > arr[mid - 1])
                return getClosest(arr[mid - 1],
                                  arr[mid], target);
               
            // Repeat for left half
            j = mid;             
        }
 
        // If target is greater than mid
        else
        {
            if (mid < n - 1 && target < arr[mid + 1])
                return getClosest(arr[mid],
                                  arr[mid + 1],
                                  target);               
            i = mid + 1; // update i
        }
    }
 
    // Only single element left after search
    return arr[mid];
}
module.exports = function(tab,start_date,indicators){
    const bidData = [];
    let somInd = 0;

    let i = 0;
    // start date from 2000
    let y = 2000;
    let count = 0;

    for(y = start_date; y <= start_date; y++){
        let tabIndValues = JSON.parse(JSON.stringify(indicators));
        for (i in tab) {
             
            if(tab[i].date == y){

                let x;

                for(x in tabIndValues){
                    
                    if(tabIndValues[x].code === tab[i].indicator.id){
                        tabIndValues[x].value = tab[i].value;
                        tabIndValues[x].name = tab[i].indicator.value;
                    }
                }
            }
        }
        //Here we do calculations
        //1. Normalisation
            let maxInd = Math.max(...tabIndValues.map(o => o.value));
            let minInd = Math.min(...tabIndValues.map(o => o.value));
            let maxNorm = Math.max(...tabIndValues.map(o => o.norm));
            let tailleInd = tabIndValues.length;
            let a = 0;
            let somInd = 0;

            for(a=0; a<tailleInd; a++){

                if(tabIndValues[a].value !== null){
                    
                    let normValue = normInd(tabIndValues[a].value,minInd,maxInd);
                    let oldValNorm = tabIndValues[a].norm;
                    tabIndValues[a].distance = 0;
                    
                    if(normValue == null){
                        tabIndValues[a].norm = 'not_mentioned';
                    }else{
                        tabIndValues[a].norm = normValue;
                    }

                    somInd += tabIndValues[a].norm*tabIndValues[a].weight;

                    tabIndValues[a].prescoring = oldValNorm/parseFloat(maxNorm);

                    if(tabIndValues[a].prescoring == Infinity){
                        tabIndValues[a].prescoring = 0;
                    }else{
                        tabIndValues[a].prescoring = 0;
                    }
                }else{
                    tabIndValues[a].value = 'not_mentioned';
                    tabIndValues[a].norm = 'cannot_calculate';
                    tabIndValues[a].prescoring = 'cannot_calculate';
                }
                tabIndValues[a].id = tabIndValues[a].code;
                //Appreciation 
                let actualCode = tabIndValues[a].code;
                    if(data_appreciation[tabIndValues[a].code]){

                        let obj = data_appreciation[tabIndValues[a].code];
                        let tempArray = [];
                        let target = parseInt(tabIndValues[a].value);
                        let closest = null;
                        let appreciation = 'B2';
                        //tabIndValues[a].data_appreciation ='';
                        for (const property in obj) {

                           tempArray = tempArray.concat(obj[property]);
                           closest = findClosest(obj[property],target);

                        }

                        for (const property in obj) {

                            if(obj[property].includes(closest)){
                                appreciation = property;
                            }
 
                         }

                         tabIndValues[a].data_appreciation = appreciation;

                    }else{

                        tabIndValues[a].data_appreciation ='B2';

                    }
                //
            }
        
        bidData.push({year:y,data:tabIndValues});
        
    }   

            return bidData;        
}