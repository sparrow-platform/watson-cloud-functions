

    
const axios = require('axios');
const rp = require('request-promise');


function main(params) {
    
const symptom = params.symptoms
    
    
const options = {
        method: "POST",
        uri: "http://34.66.161.216:5000/api/validateSymptom",
        json: true,
        body: {"name" : symptom}
    };
    return rp(options)
    .then(res => {
        
        var data = ""
        
        if(Object.keys(res).length>1){
            data += "\n Did you mean any of the following : \n"
        }
        
        
        if(Object.keys(res).length==1){
            isSymptom = true
            for (var key in res) {
              data += res[key]
            }
        }
        else{
            isSymptom = false
            for (var key in res) {
              data += " \n "
              data += res[key]
              
            }
            
        }
        
        
        
        
        
        var response = {
            "data" : data,
            "isSymptom" : isSymptom
        }
        return response;
    })
    .catch(err => console.log(err));

}


