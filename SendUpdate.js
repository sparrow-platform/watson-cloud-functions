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
     let update = params.update;
     let address = params.address;
     let session = params.session;
     console.log(update, address, session);
 
     let geoOptions = {
         uri: "https://maps.googleapis.com/maps/api/geocode/json",
         qs: {
             address: address,
             key: ""
         },
         json: true
     };
     let geoPromise = rp(geoOptions)
         .then(data => {
             return data;
         })
         .catch(err => {
             console.log(err);
             return err;
         });
 
     let cloudant = Cloudant({
         username: "",
         password: "",
         url:
             "https://a2bd5c89-e9cb-490e-a8d0-c6c1f40153a6-bluemix:20e2923d8817e8c5bb111c39e477d6275e278a792a40339e3fe5c9ca8127055c@a2bd5c89-e9cb-490e-a8d0-c6c1f40153a6-bluemix.cloudantnosqldb.appdomain.cloud"
     });
     let users = cloudant.db.use("users");
     let sessions = cloudant.db.use("sessions");
 
     let sessionPromise = sessions
         .find({ selector: { sessionID: session } })
         .then(data => {
             return data;
         })
         .catch(err => {
             console.log(err);
             return err;
         });
     console.log("here");
     return Promise.all([geoPromise, sessionPromise])
         .then(data => {
             let aggregateData = {
                 lng: data[0].results[0].geometry.location.lng,
                 lat: data[0].results[0].geometry.location.lat,
                 userID: data[1].docs[0]._id
             };
             console.log(aggregateData);
             return aggregateData;
         })
         .then(data => {
             console.log("in user promise");
             users.list({ include_docs: true }).then(body => {
                 body.rows.forEach(doc => {
                     // console.log(doc.doc);
                     if (
                         doc.doc.location &&
                         doc.doc._id !== data.userID &&
                         Math.abs(doc.doc.location.results[0].geometry.location.lng - data.lng) < 0.5 &&
                         Math.abs(doc.doc.location.results[0].geometry.location.lat - data.lat) < 0.5
                     ) {
                         console.log("should send to", doc.doc._id);
                         let updateOptions = {
                             method: "POST",
                             uri: "https://sparrow-community-connect-middleware-noisy-bandicoot.mybluemix.net/middleware/send_message",
                             form: {
                                 userID: doc.doc._id,
                                 message: update
                             },
                             json: true
                         };
                         rp(updateOptions);
                     }
                 });
                 return { msg: "success" };
             });
         })
         .catch(err => {
             console.log(err);
             return err;
         });
 }