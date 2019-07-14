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
 let Cloudant = require("@cloudant/cloudant");
 
 function main(params) {
     let userAddress = params.address;
     let session = params.session;
     console.log("userAddress,",userAddress,"session,",session)
     var response;
     let options = {
         uri: "https://maps.googleapis.com/maps/api/geocode/json",
         qs: {
             address: userAddress,
             key: ""
         },
         json: true // Automatically parses the JSON string in the response
     };
     const geoPromise = rp(options);
     
     let cloudant = Cloudant({
         username: "",
         password: "",
         url:
             "https://a2bd5c89-e9cb-490e-a8d0-c6c1f40153a6-bluemix:20e2923d8817e8c5bb111c39e477d6275e278a792a40339e3fe5c9ca8127055c@a2bd5c89-e9cb-490e-a8d0-c6c1f40153a6-bluemix.cloudantnosqldb.appdomain.cloud"
     });
     let users = cloudant.db.use("users");
     let sessions = cloudant.db.use("sessions");
     const sessionPromise = sessions.find({ selector: { sessionID: session } });
 
     return Promise.all([geoPromise, sessionPromise])
         .then(values => {
             return { address: userAddress, location: values[0], userID: values[1].docs[0]._id };
         })
         .then(values => {
             response = values;
             return users.get(values.userID);
         })
         .then(user => {
             return users.insert({ ...user, address: response.address, location: response.location });
         })
         .catch(err => {
             return { err };
         });
 }
 