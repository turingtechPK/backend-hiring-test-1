import VoiceResponse from "twilio/lib/twiml/VoiceResponse";
import { Call } from "../model/call.mongoose.model";
import { GetCallResponse } from "../model/response/get.response.model";
import { TwilioResponseMessage } from "../model/response/messages.enum";

/**
 * receive inbound call and redirect for user input
 */
export async function inboundCall(): Promise<string> {
  try {
    const twiml = new VoiceResponse();
    twiml.say(TwilioResponseMessage.WELCOME_MESSAGE);

    const gather = twiml.gather({
      input: ["dtmf"],
      numDigits: 1, //the number of digits expected from the caller as input
      action: "/backend-test/api/v1/call/gather",
      method: "POST",
      timeout: 5, //wait time in seconds for user input before further action is performed
    });

    gather.say(TwilioResponseMessage.INPUT_PROMPT_MESSAGE);

    // If the user doesn't enter input, loop
    twiml.redirect(
      {
        method: "POST",
      },
      "/backend-test/api/v1/call/voice"
    );

    return twiml.toString();
  } catch (err) {
    console.error(
      "[callService][inboundCall] Unable to connect inbound call",
      err
    );
    throw new Error(err.message);
  }
}

/**
 * gather input from user and process further accordingly
 *
 * @param digits user enters digit as input
 */
export async function gatherInput(digits: string): Promise<string> {
  try {
    const twiml = new VoiceResponse();

    if (digits) {
      switch (digits) {
        case "1":
          twiml.say(TwilioResponseMessage.CALL_FORWARDING_MESSAGE);

          twiml.dial({
            callerId: process.env.PHONE_NUMBER,
          });

          twiml.redirect(
            {
              method: "POST",
            },
            "/backend-test/api/v1/call-end"
          );
          break;

        case "2":
          twiml.say(TwilioResponseMessage.VOICEMAIL_RECORD_MESSAGE);
          twiml.record({
            finishOnKey: "*", //key to press if user wishes to stop the voice mail recording
            playBeep: true, //recording will start after a beep
          });
          break;

        default:
          twiml.say(TwilioResponseMessage.WRONG_INPUT_MESSAGE);
          twiml.pause({
            length: 3, //pause for 3 seconds before redirecting user to enter choices
          });
          twiml.redirect(
            {
              method: "POST",
            },
            "/backend-test/api/v1/call/voice"
          );
          break;
      }
      return twiml.toString();
    } else {
      // If no input was sent then redirect
      twiml.redirect(
        {
          method: "POST",
        },
        "/backend-test/api/v1/call/voice"
      );
    }
  } catch (err) {
    console.error("[callService][gatherInput] Unable to gather input", err);
    throw new Error(err.message);
  }
}

export async function endCall(): Promise<void> {
  try {
    const twiml = new VoiceResponse();
    twiml.say(TwilioResponseMessage.CALL_END_MESSAGE);
    twiml.hangup();
  } catch (err) {
    console.error("[callService][endCall] Unable to end call", err);
    throw new Error(err.message);
  }
}

/**
 * when call is completed save to database
 * @param reqBody req body
 */
export async function statusChange(reqBody): Promise<void> {
  try {
    await Call.create({
      sid: reqBody.CallSid,
      status: reqBody.CallStatus,
      duration: reqBody.CallDuration,
      recordingUrl: reqBody.RecordingUrl,
      from: reqBody.From,
      createdAt: new Date(),
    });
  } catch (err) {
    console.error("[callService][statusChange]Unable to change status");
    throw new Error(err.message);
  }
}

/**
 * activity feed
 * @returns call details
 */
export async function getCalls(): Promise<GetCallResponse[]> {
  try {
    const calls = await Call.find();
    const callsResponse: GetCallResponse[] = calls.map((call) => {
      return {
        id: call.id.toString(),
        sid: call.sid,
        status: call.status,
        duration: call.duration,
        recordingUrl: call.recordingUrl,
        from: call.from,
        createdAt: call.createdAt,
      };
    });
    return callsResponse;
  } catch (err) {
    console.error("[callService][getCalls]Unable to get calls");
    throw new Error(err.message);
  }
}
