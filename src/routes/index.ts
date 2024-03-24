import { Router} from "express";
import * as homeController from '../controllers/index'
import * as twilioController from '../controllers/twilio'
import * as callLogsController from '../controllers/call-logs'

const router = Router();

router.get("/", homeController.helloFromServer);
router.get("/voice", twilioController.handleCall);
router.post("/handleUserInput", twilioController.handleUserInput);
router.post("/handleVoicemail", twilioController.handleVoicemail);
router.post("/handleCallEnd", twilioController.handleCallEnd);
router.get("/call-logs/:id", callLogsController.getCallById);
router.get("/call-logs", callLogsController.getAllCallLogs);

export default router;
