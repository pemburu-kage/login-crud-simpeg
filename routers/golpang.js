module.exports = function(app){
    const controller = require("../controllers/golpang");

    app.get("/api/simpeg/golpang", controller.readAllGolpangs);
    app.post("/api/simpeg/golpang", controller.createGolpangs);
    app.get("/api/simpeg/golpang/:golpangId", controller.readGolpangById);
    app.put("/api/simpeg/golpang/:golpangId", controller.updateGolpang);
    app.delete("/api/simpeg/golpang/:golpangId", controller.deleteGolpang);
}