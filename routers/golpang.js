// module.exports = function(app){
//     const controller = require("../controllers/golpang");

//     app.get("/api/simpeg/golpang", controller.readAllGolpangs);
//     app.post("/api/simpeg/golpang", controller.createGolpangs);
//     app.get("/api/simpeg/golpang/:golpangId", controller.readGolpangById);
//     app.put("/api/simpeg/golpang/:golpangId", controller.updateGolpang);
//     app.delete("/api/simpeg/golpang/:golpangId", controller.deleteGolpang);
// }
const express = require('express');
const router = express.Router();
const controller = require("../controllers/golpang");

// ini cukup slash aja karena di routers/index.js sudah terdaftar sebagai route /golpang
router.get("/", controller.readAll);
router.post("/", controller.create);

// clean codenya cukup :id aja, karena golpang sudah di dahului di routers/index.js
// itu berarti sudah teridentifikasi bahwa :id tersebut mengacu pada golpang
router.get("/:golpangId", controller.read);
router.put("/:golpangId", controller.update);
router.delete("/:golpangId", controller.destroy);

// clean code untuk penamaan controller juga gk perlu di kasih nama golpang
// cukup penamaan untuk event atau action nya aja, sebagai contoh
// controller.readAll
// controller.create
// controller.read // untuk detail
// controller.destroy // untuk delete data karena penggunaan nama pada variable atau function delete terlarang,
// karena delete sudah di pakai javascript
// controller.update

module.exports = router;