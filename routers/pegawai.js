module.exports = function(app){
    const controller = require("../controllers/pegawai");

    app.get("/api/simpeg/pegawai", controller.readAllPegawais);
    app.post("/api/simpeg/pegawai", controller.createPegawais);
    app.get("/api/simpeg/pegawai/:pegawaiId", controller.readPegawaiById);
    app.put("/api/simpeg/pegawai/:pegawaiId", controller.updatePegawai);
    app.delete("/api/simpeg/pegawai/:pegawaiId", controller.deletePegawai); 
}