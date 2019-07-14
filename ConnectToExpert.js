/**
  *
  * main() will be run when you invoke this action
  *
  * @param Cloud Functions actions accept a single parameter, which must be a JSON object.
  *
  * @return The output of this action, which must be a JSON object.
  *
  */
  
 let rp = require('request-promise');

 function main(params) {
     
     const session = params.session;
     const docType = params.type;
     const options = {
         method: 'POST',
         uri: "https://sparrow-community-connect-middleware-noisy-bandicoot.mybluemix.net/middleware/connect_expert",
         form: {
             sessionID: session,
             type: docType
         },
         json: true
     };
     return rp(options)
     .then(res=>{
         if(res === "Invalid Session") {
             return {"err":"Invalid Session"}
         }else {
             return {msg:res}
         }
         
     })
     .catch(err=> {
         return {"err":err}
     })
 }
 