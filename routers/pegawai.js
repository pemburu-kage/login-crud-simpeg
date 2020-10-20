const express = require('express');
const router = express.Router();
const controller = require("../controllers/pegawai");

router.get("/", controller.readAll);
router.post("/", controller.create);
router.get("/:pegawaiId", controller.read);
router.put("/:pegawaiId", controller.update);
router.delete("/:pegawaiId", controller.destroy);

module.exports = router;