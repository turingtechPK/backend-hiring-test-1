import { TwilioService } from './twilio.service';
import * as TwilioDTO from './dto';
export declare class TwilioController {
    private readonly twilioService;
    constructor(twilioService: TwilioService);
    recieveCall(body: TwilioDTO.RecieveCall): Promise<string>;
    respondToDialpad(body: TwilioDTO.RespondToDialpad): Promise<string>;
    saveCall(body: TwilioDTO.SaveCall): Promise<string>;
    forwardCall(): Promise<string>;
    recordVoiceMessage(): Promise<string>;
    saveVoiceMessage(body: TwilioDTO.SaveVoiceMessage): Promise<string>;
    fetchHistory(query: TwilioDTO.FetchHistory): Promise<{
        success: number;
        message: string;
        data: {
            rows: (import("mongoose").Document<unknown, any, import("../models/history.model").HistoryInterface> & import("../models/history.model").HistoryInterface & Required<{
                _id: import("mongoose").Schema.Types.ObjectId;
            }>)[];
            rowsCount: number;
        };
    }>;
}
