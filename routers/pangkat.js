const express = require('express');
const router = express.Router();
const controller = require("../controllers/pangkat");

router.get("/", controller.readAll);
router.post("/", controller.create);
router.get("/:pangkatId", controller.read);
router.put("/:pangkatId", controller.update);
router.delete("/:pangkatId", controller.destroy);

module.exports = router;