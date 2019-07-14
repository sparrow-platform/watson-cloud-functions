

    
const axios = require('axios');
const rp = require('request-promise');


function main(params) {
    
    
    var symptoms = params.symptoms
    
    var temp = symptoms.split('|')
    
    symptomsNew = ""
    
    var arrayLength = temp.length;
    for (var i = 0; i < arrayLength; i++) {
        symptom = temp[i]
        if(symptom!=""){
            symptomsNew += symptom.toLowerCase()
            symptomsNew += '|'
        }
    }
    
    
    const options = {
            method: "POST",
            uri: "http://34.66.161.216:5000/api/predictFromString",
            json: true,
            body: {"symptoms" : symptomsNew}
        };
        return rp(options)
        .then(res => {
            
            resp = ""
            var count = 0
            
            for (diseaseCount in res){
              resp = resp + "Possible diseases: " + res[diseaseCount].disease + " \n"
              resp = resp + "Disease probability: " + res[diseaseCount].prob + " \n"
              resp = resp + "Other symptoms for this disease: " + res[diseaseCount].sy + " \n"
               
              resp += " \n"
              if (count == 3){
                  break
              }
              count += 1
            }
        
            var response = {
                "data" : resp
            }
            return response;
        
        })
        .catch(err => console.log(err));
    
    }


