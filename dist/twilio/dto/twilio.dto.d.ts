export declare class RecieveCall {
    CallSid: string;
    To: string;
    From: string;
    CallStatus: string;
}
export declare class RespondToDialpad {
    CallSid: string;
    CallStatus: string;
    Digits: string;
}
export declare class SaveCall {
    CallSid: string;
}
export declare class SaveVoiceMessage {
    CallSid: string;
    RecordingDuration: number;
    RecordingUrl: string;
}
export declare class FetchHistory {
    limit?: number;
    offset?: number;
}
