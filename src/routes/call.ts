import Express, { Request, Response } from "express";
import endcall from "../controllers/endcall";
import menu from "../controllers/menu";
import welcome from '../controllers/welcome';

const router = Express.Router();

router.route("/welcome").post(welcome);
router.route("/menu").post(menu);
router.route("/endcall").post(endcall)

export default router;