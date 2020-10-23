const express = require('express');
const router = express.Router();
const controller = require("../controllers/golpang");
const verifyToken = require('../middlewares/verifyToken')
const authorizeRole = require('../middlewares/authorizeRole')
const { ROLE } = require('../libs/constant');

router.get("/", verifyToken, authorizeRole([ROLE.ADMIN, ROLE.ESELON_I]), controller.readAll);
router.post("/", controller.create);


router.get("/:golpangId", controller.read);
router.put("/:golpangId", controller.update);
router.delete("/:golpangId", controller.destroy);


module.exports = router;