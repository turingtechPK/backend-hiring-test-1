import { Model } from 'mongoose';
import { HistoryInterface } from 'src/models/history.model';
import * as TwilioDTO from './dto';
export declare class TwilioService {
    private HistoryModel;
    constructor(HistoryModel: Model<HistoryInterface>);
    recieveCall(body: TwilioDTO.RecieveCall): Promise<string>;
    respondToDialpad(body: TwilioDTO.RespondToDialpad): Promise<string>;
    forwardCall(): Promise<string>;
    saveCall(body: TwilioDTO.SaveCall): Promise<string>;
    recordVoiceMessage(): Promise<string>;
    saveVoiceMessage(body: TwilioDTO.SaveVoiceMessage): Promise<string>;
    fetchHistory(query: TwilioDTO.FetchHistory): Promise<{
        success: number;
        message: string;
        data: {
            rows: (import("mongoose").Document<unknown, any, HistoryInterface> & HistoryInterface & Required<{
                _id: import("mongoose").Schema.Types.ObjectId;
            }>)[];
            rowsCount: number;
        };
    }>;
}
