let express = require("express");
const router = express.Router();

const {
  welcome,
  menu,
  goodbye,
  insertCall,
} = require("../controllers/calls.controller");

router.route("/welcome").get(welcome, insertCall);
router.route("/menu").post(menu, insertCall);
router.route("/goodbye").post(goodbye, insertCall);

module.exports = router;
