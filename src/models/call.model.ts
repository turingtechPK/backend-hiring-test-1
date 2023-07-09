export class Call {
  id: number; // The unique identifier for the call
  status: string; // The status of the call (e.g., connected, busy, failed)
  callDuration?: number; // The duration of the call in seconds (optional)
  voiceMailDuration?: number; // The duration of the voicemail in seconds (optional)
  voiceMailLink?: string; // The URL of the voicemail recording (optional)
  fromNumber: string; // The phone number of the caller
  fromCountry: string; // The country from which the call originated
}
