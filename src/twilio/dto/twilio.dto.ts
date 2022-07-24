export class RecieveCall {
  CallSid: string;
  To: string;
  From: string;
  CallStatus: string;
}

export class RespondToDialpad {
  CallSid: string;
  CallStatus: string;
  Digits: string;
}

export class SaveCall {
  CallSid: string;
}

export class SaveVoiceMessage {
  CallSid: string;
  RecordingDuration: number;
  RecordingUrl: string;
}

export class FetchHistory {
  limit?: number;
  offset?: number;
}
