const DataPangkat = require("../models").tbpangkat;
const { handleError, ErrorHandler } = require("../helper/error");

exports.readAllPangkats = (req, res) =>{
  DataPangkat.findAll()
  .then(data =>{
    res.status(200).send({
      hasil: data
    })
  })
  .catch(err => {
    console.log(err)
  })   
}

exports.createPangkats = (req, res) =>{
  const { idnip, idgolpang, tmt, glr_dpn, glr_blkng, mkptahun, mkpbulan, nomorsk, tglsk, oleh, prodi, tahun } = req.body;
  DataPangkat.create({      
    idnip,
    idgolpang,    
    tmt,
    glr_dpn,    
    glr_blkng,
    mkptahun, 
    mkpbulan,
    nomorsk,
    tglsk,
    oleh,
    prodi,
    tahun
  })
  .then(data =>{
    res.status(201).send({
      pesan: "Pangkat berhasil ditambahkan",
      hasil: data
    })
  })
  .catch(err => {
    console.log(err)
  })
};

exports.readPangkatById = (req, res) => {
  const pangkatId = req.params.pangkatId;

  DataPangkat.findOne({
    where: { id: pangkatId}
  })
  .then(data => {
    if(!data) {
      handleError({statusCode: 404, message: "Pangkat tidak ditemukan!"}, res);
    } else {
      res.status(200).send({
        hasil: data
      })
    }
  })
}

exports.updatePangkat = (req, res) => {
  const pangkatId = req.params.pangkatId;

  DataPangkat.findOne({
    where: { id: pangkatId }
  })
  .then(data => {
    if(!data) {
      handleError({statusCode: 404, message: "Pangkat tidak dapat diperbarui!"}, res);
    } else {
      DataPangkat.update(
        {                                 
          idnip: req.body.idnip,
          idgolpang: req.body.idgolpang,    
          tmt: req.body.tmt,
          glr_dpn: req.body.glr_dpn,    
          glr_blkng: req.body.glr_blkng,
          mkptahun: req.body.mkptahun, 
          mkpbulan: req.body.mkpbulan,
          nomorsk: req.body.nomorsk,
          tglsk: req.body.tglsk,
          oleh: req.body.oleh,
          prodi: req.body.prodi,
          tahun: req.body.tahun       
        },
        { where: { id: pangkatId }
      })
      res.status(200).send({
        pesan: "Pangkat berhasil di perbarui",
        hasil: data
      })
    }
  })
}

exports.deletePangkat = (req, res) => {
  const pangkatId = req.params.pangkatId;

  DataPangkat.findOne({
    where: { id: pangkatId }
  })
  .then(data => {
    if(!data) {
      handleError({statusCode: 404, message: "Pangkat tidak dikenal!"}, res);
    } else {
      DataPangkat.destroy({
          where: { id: pangkatId }
      })
      res.status(200).send({
        pesan: "Pangkat berhasil di hapus",
        hasil: data
      })
    }
  })
}