const { AudioCallService } = require("../services");

const connect = (req, res) => {
  const callResponse = AudioCallService.handleConnect();

  res.type("text/xml");
  return res.send(callResponse);
};

const input = (req, res) => {
  const { Digits } = req.body;
  console.log(req.body, Digits);
  const inputResponse = AudioCallService.handleInput(Digits);

  res.type("text/xml");
  return res.send(inputResponse);
};

const end = (req, res) => {
  const response = AudioCallService.createEndCallRequest();

  res.type("text/xml");
  return res.status(200).send(response);
};

const status = async (req, res) => {
  const {
    CallSid: sid,
    CallStatus: callStatus,
    CallDuration: callDuration,
    RecordingUrl: audioFileLink,
    From: from,
  } = req.body;
  console.log(req.body)
  await AudioCallService.logCall(
    sid,
    callStatus,
    callDuration,
    audioFileLink,
    from
  );
  return res.status(200).send();
};

const logs = async (req, res) => {
  const audioCalls = await AudioCallService.logs();

  return res.status(200).json(audioCalls);
};

module.exports = {
  connect,
  input,
  end,
  status,
  logs,
};
