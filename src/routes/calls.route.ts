import { Router } from "express";
import { incomingCalls, voiceMail, gatherInput, voice, getAllCallLogs } from "../controller/calls/Call";

const callRoutes = Router()

callRoutes.post("/incoming", incomingCalls)
callRoutes.post("/gather", gatherInput)
callRoutes.post("/save/voicemail", voiceMail)
callRoutes.post("/save/voice", voice)
callRoutes.get("/get/all", getAllCallLogs)

export default callRoutes
