import Express, { Request, Response } from "express";
import callHandler from "../controllers/callHandler";
import callLogs from "../controllers/callLogs";
import menu from "../controllers/menu";
import welcome from '../controllers/welcome';

const router = Express.Router();

router.route("/logs").get(callLogs);
router.route("/welcome").post(welcome);
router.route("/menu").post(menu);
router.route("/status").post(callHandler);

export default router;