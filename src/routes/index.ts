import { Router} from "express";
import * as homeController from '../controllers/index'
import * as twilioController from '../controllers/twilio'

const router = Router();

router.get("/", homeController.helloFromServer);
router.get("/voice", twilioController.handleCall);
router.post("/handleUserInput", twilioController.handleUserInput);
router.post("/handleVoicemail", twilioController.handleVoicemail);
router.post("/handleCallEnd", twilioController.handleCallEnd);

export default router;
