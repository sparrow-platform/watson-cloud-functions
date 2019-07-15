/**
 *
 * main() will be run when you invoke this action
 *
 * @param Cloud Functions actions accept a single parameter, which must be a JSON object.
 *
 * @return The output of this action, which must be a JSON object.
 *
 */

let Cloudant = require("@cloudant/cloudant");

function main(params) {
    let areaSpecialty = params.area;
    let yearOfExp = params.year;
    let session = params.session;
    let cloudant = Cloudant({ username: "", password: "", url: "" });
    let sessions = cloudant.db.use("sessions");
    let users = cloudant.db.use("users");
    return new Promise((resolve, reject) => {
        sessions.find({ selector: { sessionID: session } }, function(err, body) {
            console.log("parameters", body, areaSpecialty, yearOfExp, session);
            if (!err && body.docs.length > 0) {
                let targetID = body.docs[0]._id;
                users.get(targetID, (err, data) => {
                    let newDoc = { _id: targetID, receiver: "ibm_assistant", type: areaSpecialty, year: yearOfExp };
                    if (!data) {
                        users.insert(newDoc, (err, success) => {
                            if (!err) {
                                console.log("yolo", { response: success });
                                resolve({ response: success });
                            }
                        });
                    } else {
                        console.log("foundUser", data);
                        users.destroy(targetID, data._rev, function(err, msg, header) {
                            if (!err) {
                                users.insert(newDoc, (err, success) => {
                                    if (!err) {
                                        console.log("yolo", { response: success });
                                        resolve({ response: success });
                                    }
                                });
                            }
                        });
                    }
                });
            } else {
                reject({ msg: "byebye" });
            }
        });
    });
}
