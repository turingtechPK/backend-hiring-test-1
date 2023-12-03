export type TwilioCallRes = {
    Called: string;
    ToState: string;
    CallerCountry: string;
    Direction: string;
    Timestamp: string;
    CallbackSource: string;
    SipResponseCode: string;
    CallerState: string;
    ToZip: string;
    SequenceNumber: string;
    CallSid: string; //Unique, using for ref
    To: string;
    CallerZip: string;
    ToCountry: string;
    CalledZip: string;
    ApiVersion: string;
    CalledCity: string;
    CallStatus: string;
    Duration: string;
    From: string;
    CallDuration: string;
    AccountSid: string;
    CalledCountry: string;
    CallerCity: string;
    ToCity: string;
    FromCountry: string;
    Caller: string;
    FromCity: string;
    CalledState: string;
    FromZip: string;
    FromState: string;
}

export type TwilioVoiceRecord = {
    ApiVersion: string;
    Called: string;
    CallStatus: string;
    RecordingSid: string; //Unique, using for ref
    RecordingUrl: string;
    From: string;
    Direction: string;
    AccountSid: string;
    ApplicationSid: string;
    Caller: string;
    CallSid: string; //Unique, using for ref
    To: string;
    RecordingDuration: string;
}

export type CallInstanceRes = {
    sid: string
    from: string,
    to: string,
    status: string
}