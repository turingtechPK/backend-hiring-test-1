import { Call, CallDocument } from "../schemas/call.schema";
export interface CallResponse {
    data: (Call & CallDocument)[]
    error: string
}
