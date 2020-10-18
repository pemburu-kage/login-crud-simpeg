const DataGolpang = require("../models").tbgolpang;
const { handleError, ErrorHandler } = require("../helper/error");

exports.readAllGolpangs = (req, res) =>{
  DataGolpang.findAll()
  .then(data =>{
    res.status(200).send({
      hasil: data
    })
  })
  .catch(err => {
    console.log(err)
  })   
}

exports.createGolpangs = (req, res) =>{
  const { golongan, pangkat } = req.body;
  DataGolpang.create({      
    golongan,
    pangkat
  })
  .then(data =>{
    res.status(201).send({
      pesan: "Golpang berhasil ditambahkan",
      hasil: data
    })
  })
  .catch(err => {
    console.log(err)
  })
};

exports.readGolpangById = (req, res) => {
  const golpangId = req.params.golpangId;

  DataGolpang.findOne({
    where: { id: golpangId}
  })
  .then(data => {
    if(!data) {
      handleError({statusCode: 404, message: "Golpang tidak ditemukan!"}, res);
    } else {
      res.status(200).send({
        hasil: data
      })
    }
  })
}

exports.updateGolpang = (req, res) => {
  const golpangId = req.params.golpangId;

  DataGolpang.findOne({
    where: { id: golpangId }
  })
  .then(data => {
    if(!data) {
      handleError({statusCode: 404, message: "Golpang tidak dapat diperbarui!"}, res);
    } else {
      DataGolpang.update(
        {                 
          golongan: req.body.golongan,
          pangkat: req.body.pangkat        
        },
        { where: { id: golpangId }
      })
      res.status(200).send({
        pesan: "Golpang berhasil di perbarui",
        hasil: data
      })
    }
  })
}

exports.deleteGolpang = (req, res) => {
  const golpangId = req.params.golpangId;

  DataGolpang.findOne({
    where: { id: golpangId }
  })
  .then(data => {
    if(!data) {
      handleError({statusCode: 404, message: "Golpang tidak dikenal!"}, res);
    } else {
      DataGolpang.destroy({
          where: { id: golpangId }
      })
      res.status(200).send({
        pesan: "Golpang berhasil di hapus",
        hasil: data
      })
    }
  })
}