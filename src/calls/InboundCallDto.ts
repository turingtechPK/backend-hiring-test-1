export class InboudCallDto {
    CallSid: string;
    From: string;
    To: string;
    CallStatus: string;
    CallDuration?: number;
    Digits?: string
}