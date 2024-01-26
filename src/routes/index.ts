import { Router} from "express";
import * as homeController from '../controllers/index'

const router = Router();

router.get("/", homeController.helloFromServer);

export default router;
