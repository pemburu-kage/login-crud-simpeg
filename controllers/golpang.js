const dataGolpang = require("../models").tbgolpang;
const { handleError, ErrorHandler } = require("../helper/error");

exports.readAll = (req, res) =>{
  dataGolpang.findAll()
  .then(data =>{
    res.status(200).send({
      hasil: data
    })
  })
  .catch(err => {
    console.log(err)
  })   
}

exports.create = (req, res) =>{
  const { golongan, pangkat } = req.body;
  dataGolpang.create({      
    golongan,
    pangkat
  })
  .then(data =>{
    res.status(201).send({
      pesan: "Golpang berhasil ditambahkan!",
      hasil: data
    })
  })
  .catch(err => {
    console.log(err)
  })
};

exports.read = (req, res) => {
  const golpangId = req.params.golpangId;

  dataGolpang.findOne({
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

exports.update = (req, res) => {
  const golpangId = req.params.golpangId;

  dataGolpang.findOne({
    where: { id: golpangId }
  })
  .then(data => {
    if(!data) {
      handleError({statusCode: 404, message: "Golpang tidak dapat diperbarui!"}, res);
    } else {
      dataGolpang.update(
        {                 
          golongan: req.body.golongan,
          pangkat: req.body.pangkat        
        },
        { where: { id: golpangId }
      })
      res.status(200).send({
        pesan: "Golpang berhasil diperbarui!",
        hasil: data
      })
    }
  })
}

exports.destroy = (req, res) => {
  const golpangId = req.params.golpangId;

  dataGolpang.findOne({
    where: { id: golpangId }
  })
  .then(data => {
    if(!data) {
      handleError({statusCode: 404, message: "Golpang tidak dikenal!"}, res);
    } else {
      dataGolpang.destroy({
          where: { id: golpangId }
      })
      res.status(200).send({
        pesan: "Golpang berhasil dihapus!",
        hasil: data
      })
    }
  })
}