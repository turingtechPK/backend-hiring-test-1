const asyncHandler = require('../Middleware/asyncHandler');
const CallLogs = require("../Models/CallLogs");
const VoiceResponse = require("twilio").twiml.VoiceResponse;
require("dotenv").config();
const client = require('twilio')(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);


const PHONE_NUMBER = "+12055519669";


exports.callStart  = asyncHandler(async(req,res,next) =>{

    const twiml = new VoiceResponse();
    

    const agent = twiml.gather({
        numDigits: 1,
        action: "/api/ivr/assistance",
    })

    agent.say("For assistance, press 1. To drop a message, press 2.")
    twiml.redirect("/api/ivr/start")

    res.set("Content-Type", "text/xml");
    res.send(twiml.toString());
})

exports.assistance = asyncHandler(async(req,res,next) =>{

    const twiml = new VoiceResponse();
    console.log("disgit",req.body.Digits)

    if (req.body.Digits) {
        if(req.body.Digits == "1"){
            twiml.say("Connecting you to another caller")
            twiml.dial(PHONE_NUMBER,{
                action:"/api/ivr/CustomerSupport"
            })
        }
        else if(req.body.Digits == "2"){
            twiml.say("Hello, Please leave a message")
            
            twiml.record({ transcribe: true, maxLength: 30 });

            twiml.hangup()
        }
        else{
            twiml.say("Sorry, Please choose the  correct choice ")

            twiml.redirect('/api/ivr/start')
        }

    }
    else{
        twiml.redirect('/api/ivr/start')
    }

    res.set("Content-Type", "text/xml").send(twiml.toString());

});

exports.AddCallLog = asyncHandler(async (req,res,next) =>{

    const {sid} = req.body

    let data

    await client.calls(sid)
      .fetch()
      .then(call => {
        data =call
      });
    let RegisterCallId = new CallLogs({
    CallId :data.sid,
    CallStatus:data.status,
    CallDuration : data.duration,
    CallFromNumber : data.from,
    RecordingUrlFile : data.subresourceUris.recordings
  })

  await RegisterCallId.save()

  return res.status(200).json({ success: true });

})



exports.RetrieveCalLogs = asyncHandler(async (req, res,next) => {
    
    const AllCallLogs = await CallLogs.find({});
    return res.json({ success: true, data: AllCallLogs });
});

exports.CustomerSupport = asyncHandler(async(req,res)=>{

    const twiml = new VoiceResponse();
    twiml.say("Hi, I am talking from customer support")

    twiml.hangup();

    res.type("/text/xml").send(twiml.toString());

})
