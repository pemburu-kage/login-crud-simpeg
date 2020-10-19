const express = require('express')
const router = express.Router()
const controller = require("../controllers/golpang");

// ini cukup slash aja karena di routers/index.js sudah terdaftar sebagai route /golpang
router.get("/", controller.readAllGolpangs);
router.post("/", controller.createGolpangs);

// clean codenya cukup :id aja, karena golpang sudah di dahului di routers/index.js
// itu berarti sudah teridentifikasi bahwa :id tersebut mengacu pada golpang
router.get("/:golpangId", controller.readGolpangById);
router.put("/:golpangId", controller.updateGolpang);
router.delete("/:golpangId", controller.deleteGolpang);

// clean code untuk penamaan controller juga gk perlu di kasih nama golpang
// cukup penamaan untuk event atau action nya aja, sebagai contoh
// controller.readAll
// controller.create
// controller.read // untuk detail
// controller.destroy // untuk delete data karena penggunaan nama pada variable atau function delete terlarang,
// karena delete sudah di pakai javascript
// controller.update

module.exports = router;