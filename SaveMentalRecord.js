/**
  *
  * main() will be run when you invoke this action
  *
  * @param Cloud Functions actions accept a single parameter, which must be a JSON object.
  *
  * @return The output of this action, which must be a JSON object.
  *
  */
  
 let Cloudant = require('@cloudant/cloudant');

 function main(params) {
     let main_mood = params.main_mood;
     let main_event = params.main_event;
     let severity_level = params.severity_level;
     let secondary_moods = params.secondary_moods;
     let session = params.session;
     let cloudant = Cloudant({ username:'', password:'',url:
       "https://a2bd5c89-e9cb-490e-a8d0-c6c1f40153a6-bluemix:20e2923d8817e8c5bb111c39e477d6275e278a792a40339e3fe5c9ca8127055c@a2bd5c89-e9cb-490e-a8d0-c6c1f40153a6-bluemix.cloudantnosqldb.appdomain.cloud" });
     let records = cloudant.db.use("mental_records");
     let sessions = cloudant.db.use("sessions");
 
     return new Promise((resolve, reject) => {
         sessions.find({ selector: { sessionID: session } }, function(err, body) {
             if (!err && body.docs.length > 0) {
                 let targetID = body.docs[0]._id;
                 let newRecord = { "userID": targetID, "main_mood": main_mood, "main_event": main_event, "severity_level": severity_level, "secondary_moods": secondary_moods, timestamp: new Date() };
                 console.log("newRecord is", newRecord);
                 records.insert(newRecord, (err, success) => {
                     if (!err) {
                         console.log("yolo", { response: success });
                         resolve({ response: success })
                     }else {
                         reject( {"msg":"byebye"})
                     }
                 });
             }else {
                 reject( {"msg":"byebye"})
             }
         });
     })
 }
 