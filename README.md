# Sparrow Watson assistant and Cloud functions

This repository contains exports of Sparrow Watson assistant and IBM cloud functions used in Sparrow. 
<p align="center">
<img  max-height=250 src="https://raw.githubusercontent.com/sparrow-platform/watson-cloud-functions/master/SparrowWatsonflow.png"/>
</p>

## skill-Medical-Diagnosis.json
- Is the IBM primary watson assistant for Sparrow platform. Sparrow Middleware makes this watson assistant available on any chat platforms. 

- Contains the Watson assistant dialog flow for Sparrow AI.
It contains dialogs for Medical diagnostics and Cognitive Behavioural therapy.

- This dialog also contains the flow for connecting users with community/experts, along with process for registration of users, doctors.

- Also contains dialog for subscribing to and creating updates 

## Cloud functions 
- AnalyzeTone.js
Cloud functon for Analyzing text tone using IBM Watson NLP

- ConnectToExpert.js
Cloud function that takes userSession ID and expert type and initiates connection between them

- LookUpSymptoms.js
Makes calls to Sparrow medical diagnostic API to check if symptom names entered exists. If not, returns nearest matching symptoms. 

- OptToUpdate.js
Captures user location and registers users for getting updates

- PredictDisease.js
Takes in '|' delimited string of symptom names and returns list of diseases with probabilities

- RegisterUser.js
Registeration handler for experts and communities

- SaveMentalRecord.js
Saves psychological issues captured by CBT

- SendUpdate.js
Captures target location and message and then sends the message to all users in that region



