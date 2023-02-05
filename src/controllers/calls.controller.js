const VoiceResponse = require("twilio").twiml.VoiceResponse;
const { Calls } = require("../models/calls.model");

const welcome = async (req, res) => {
  const twiml = new VoiceResponse();

  const gather = twiml.gather({
    action: "/call/menu",
    numDigits: "1",
    method: "POST",
  });

  gather.say(
    "Thanks for calling our Company. " +
      "Please press 1 to forward this call. " +
      "Press 2 for send a voicemail.",
    { voice: "alice", loop: 3 }
  );
  res.type("text/xml").send(twiml.toString());
};

const menu = async (req, res) => {
  const digit = req.body.Digits;
  req.call.options = req.call.options?.concat(digit) ?? [digit];
  const twiml = new VoiceResponse();

  const redirectWelcome = () => {
    gather.say("Invalid selection, ending call", {
      voice: "alice",
    });
    return twiml.toString();
  };

  const callForward = () => {
    twiml.say("Connecting you to second contact");
    twiml.dial("+923242172402", {
      action: "/call/goodbye",
    });
    return twiml.toString();
  };

  const voiceMail = () => {
    twiml.say("Your message is now being recorded");
    twiml.record();
    return twiml.toString();
  };

  const optionActions = [null, callForward, voiceMail];
  res
    .type("text/xml")
    .send(optionActions[digit] ? optionActions[digit]() : redirectWelcome());
};

const goodbye = async (req, res) => {
  const response = new VoiceResponse();
  response.say("Thank you for using our helpline. Goodbye.");
  response.hangup();
  res.type("text/xml").send(response.toString());
};

const insertCall = async (req, res) => {
  const call = req.call;
  call.endTime = new Date();
  new Calls(call).save();
};

module.exports = { welcome, menu, goodbye, insertCall };
