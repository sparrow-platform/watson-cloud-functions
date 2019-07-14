/**
  *
  * main() will be run when you invoke this action
  *
  * @param Cloud Functions actions accept a single parameter, which must be a JSON object.
  *
  * @return The output of this action, which must be a JSON object.
  *
  */
  
 const ToneAnalyzerV3 = require("watson-developer-cloud/tone-analyzer/v3");

 function main(params) {
     const tone_analyzer = new ToneAnalyzerV3({
         version: "2017-09-21",
         iam_apikey: "",
         url: "https://gateway.watsonplatform.net/tone-analyzer/api"
     });
     return new Promise((resolve, reject) => {
         let request = {
             tone_input: params.userInput,
             content_type: "text/plain",
             sentences: true
         };
         tone_analyzer.tone(request, (err, response) => {
             if(!err) {
                 resolve({message:response})
             }else {
                 reject({message:"failed"})
             }
         });
     });
 }
 