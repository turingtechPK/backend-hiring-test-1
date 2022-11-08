const express = require("express");
const VoiceResponse = require("twilio").twiml.VoiceResponse;
const urlencoded = require("body-parser").urlencoded;
const routes = require("./routes");
const db = require("./models");

const app = express();
app.use(urlencoded({ extended: false }));

db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch((err) => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

// load routes
routes(app);

// const SUPPORT_PHONE_NUMBER = "+15558675310";

// Create a route that will handle Twilio webhook requests, sent as an
// HTTP POST to /voice in our application
// app.post("/voice", (request, response) => {
//   // Use the Twilio Node.js SDK to build an XML response
//   const twiml = new VoiceResponse();

//   const gather = twiml.gather({
//     numDigits: 1,
//     action: "/gather",
//   });
//   gather.say("For support, press 1. To drop a voicemail, press 2.");

//   // If the user doesn't enter input, loop
//   twiml.redirect("/voice");

//   // Render the response as XML in reply to the webhook request
//   response.type("text/xml");
//   response.send(twiml.toString());
// });

// // Create a route that will handle <Gather> input
// app.post("/gather", (request, response) => {
//   // Use the Twilio Node.js SDK to build an XML response
//   const twiml = new VoiceResponse();

//   // If the user entered digits, process their request
//   if (request.body.Digits) {
//     switch (request.body.Digits) {
//       case "1":
//         twiml.say("Connecting you to Customer Support.");
//         twiml.dial(SUPPORT_PHONE_NUMBER, {
//           action: "/goodbye",
//         });
//         break;
//       case "2":
//         twiml.say("Hello. Please leave a message after the beep.");
//         // Use <Record> to record and transcribe the caller's message
//         twiml.record({ transcribe: true, maxLength: 30 });
//         // End the call with <Hangup>
//         twiml.hangup();
//         break;
//       default:
//         twiml.say("Sorry, I don't understand that choice.");
//         twiml.pause();
//         twiml.redirect("/voice");
//         break;
//     }
//   } else {
//     // If no input was sent, redirect to the /voice route
//     twiml.redirect("/voice");
//   }

//   // Render the response as XML in reply to the webhook request
//   response.type("text/xml");
//   response.send(twiml.toString());
// });

// app.post("/goodbye", (req, res) => {
//   const twiml = new VoiceResponse();
//   twiml.say("Thank you for Contacting Us. Goodbye.");
//   twiml.hangup();
//   res.set("Content-Type", "text/xml");
//   res.send(twiml.toString());
// });

const PORT = 3000;

// Create an HTTP server and listen for requests on port 3000
app.listen(PORT, () => {
  console.log("Now listening on port 3000. ");
});
