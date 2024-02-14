import { Document } from "mongoose";
import { IRecording } from "./recording.interface";

export interface ICall  {
    readonly caller: string;
    readonly caller_country: string;
    readonly called_to: string;
    readonly called_to_country: string;
    readonly CallSid: string;
    call_duration?: string ;
     Recording?: IRecording,
}
