module.exports = function(app){
    const controller = require("../controllers/pangkat");

    app.get("/api/simpeg/pangkat", controller.readAllPangkats);
    app.post("/api/simpeg/pangkat", controller.createPangkats);
    app.get("/api/simpeg/pangkat/:pangkatId", controller.readPangkatById);
    app.put("/api/simpeg/pangkat/:pangkatId", controller.updatePangkat);
    app.delete("/api/simpeg/pangkat/:pangkatId", controller.deletePangkat);
}