const admin = require('firebase-admin');
const functions = require('firebase-functions');

admin.initializeApp();

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

exports.storeResults = functions.https.onRequest((request, response) => {

    response.set('Access-Control-Allow-Origin', "https://dis-sin.github.io")

    let results = JSON.parse(request.body.results);

    if (!validateResults(results)){
        response.send("Error writing document, invalid data was passed!");
        return;
    }

    admin.firestore().collection("Results").doc(request.body.uuid).set({
        basic_department: results.basic_department,
        basic_classification: results.basic_classification,
        dataCulture: results.dataCulture,
        dataEthicsAndSecurity: results.dataEthicsAndSecurity,
        askQuestions: results.askQuestions,
        find: results.find,
        get: results.get,
        verify: results.verify,
        clean: results.clean,
        analyze: results.analyze,
        visualize: results.visualize,
        communicate: results.communicate,
        assessAndInterpret: results.assessAndInterpret,
        dateCompleted: admin.firestore.Timestamp.fromDate(new Date())
    })
    .then(function() {
        response.send("Document successfully written!");
        return;
    })
    .catch(function(error) {
        console.error("Error writing document: ", error);
        response.send("Error writing document: ", error);
        return;
    });
});

function validateResults(results) {
    for (const [key, value] of Object.entries(results)) {
        if (["basic_department", "basic_classification"].includes(key) && typeof(value) != "string"){
            return false;
        }
        else if (value < 0 || value > 3){
            return false;
        }
    }
    return true;
}
