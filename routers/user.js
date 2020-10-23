const express = require('express');
const router = express.Router();
const controller = require("../controllers/user");

router.get("/", controller.readAll);
router.post("/", controller.create);
router.get("/:userId", controller.read);
router.put("/:userId", controller.update);
router.delete("/:userId", controller.destroy);
router.get("/signup", controller.signUp);
router.post("/signin", controller.signIn);

module.exports = router;