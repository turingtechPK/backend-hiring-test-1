// This is the type of data returned once call in finised or a voicemail is recorded

export class RecordingDto {
  ApiVersion: string;
  TranscriptionType: string;
  TranscriptionUrl: string;
  TranscriptionSid: string;
  Called: string;
  RecordingSid: string;
  CallStatus: string;
  RecordingUrl: string;
  From: string;
  Direction: string;
  url: string;
  AccountSid: string;
  TranscriptionText: string;
  Caller: string;
  TranscriptionStatus: string;
  CallSid: string;
  To: string;
  ForwardedFrom: string;
}
