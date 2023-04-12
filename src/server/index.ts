require('dotenv').config();
const express = require('express');
const Calls = require('../models/Calls')
const VoicemailCalls = require('../models/VoicemailCalls')
const ForwardedCalls = require('../models/ForwardedCalls')

const app = express();

module.exports = (async function () {
    // Use express.json() middleware to parse incoming request bodies
    app.use(express.json());
    app.use(express.urlencoded({extended: true}));

    app.set("view engine", "ejs");
    
    const incomingCallsRouter = require('../routers/call/incoming-call');
    app.use(incomingCallsRouter);

    //view to get activities
    app.get('/',async(req,res)=>{
        let calls = await Calls.find({});
        let vc = await VoicemailCalls.find({});
        let fc = await ForwardedCalls.find({});

        let forwardedCalls = [];
        let voicemailCalls = [];

        //forwarded calls
        for(let i =0 ; i<calls.length ; i++){
            for(let j=0; j<fc.length;j++){
                if(String(calls[i].CallSid) === String(fc[j].CallSid)){
                    let combined = {...calls[i], ...fc[j]}
                    forwardedCalls.push(combined)
                }
            }
        }

        //voicemail calls
        for(let i =0 ; i<calls.length ; i++){
            for(let j=0; j<vc.length;j++){
                if(String(calls[i].CallSid) === String(vc[j].CallSid)){
                    let combined = {...calls[i], ...vc[j]}
                    voicemailCalls.push(combined)
                }
            }
        }
        res.render('activities', {forwardedCalls,voicemailCalls})
    })
    return app;
})();