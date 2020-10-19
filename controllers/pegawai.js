const DataPegawai = require("../models").tbpegawai;
const { handleError, ErrorHandler } = require("../helper/error");

exports.readAllPegawais = (req, res) =>{
  DataPegawai.findAll()
  .then(data =>{
    res.status(200).send({
      hasil: data
    })
  })
  .catch(err => {
    console.log(err)
  })   
}

exports.createPegawais = (req, res) =>{
  const { nama, nip, tmp_lhr, tgl_lhr, status, penginputPeg } = req.body;
  DataPegawai.create({      
    nama,
    nip,    
    tmp_lhr,
    tgl_lhr,    
    status,
    penginputPeg
  })
  .then(data =>{
    res.status(201).send({
      pesan: "Pegawai berhasil ditambahkan",
      hasil: data
    })
  })
  .catch(err => {
    console.log(err)
  })
};

exports.readPegawaiById = (req, res) => {
  const pegawaiId = req.params.pegawaiId;

  DataPegawai.findOne({
    where: { id: pegawaiId}
  })
  .then(data => {
    if(!data) {
      handleError({statusCode: 404, message: "Pegawai tidak ditemukan!"}, res);
    } else {
      res.status(200).send({
        hasil: data
      })
    }
  })
}

exports.updatePegawai = (req, res) => {
  const pegawaiId = req.params.pegawaiId;

  DataPegawai.findOne({
    where: { id: pegawaiId }
  })
  .then(data => {
    if(!data) {
      handleError({statusCode: 404, message: "Pegawai tidak dapat diperbarui!"}, res);
    } else {
      DataPegawai.update(
        {                     
          nama: req.body.nama,
          nip: req.body.nip,    
          tmp_lhr: req.body.tmp_lhr,
          tgl_lhr: req.body.tgl_lhr,    
          status: req.body.status,
          penyuntingPeg: req.body.penyuntingPeg       
        },
        { where: { id: pegawaiId }
      })
      res.status(200).send({
        pesan: "Pegawai berhasil di perbarui",
        hasil: data
      })
    }
  })
}

exports.deletePegawai = (req, res) => {
  const pegawaiId = req.params.pegawaiId;

  DataPegawai.findOne({
    where: { id: pegawaiId }
  })
  .then(data => {
    if(!data) {
      handleError({statusCode: 404, message: "Pegawai tidak dikenal!"}, res);
    } else {
      DataPegawai.destroy({
          where: { id: pegawaiId }
      })
      res.status(200).send({
        pesan: "Pegawai berhasil di hapus",
        hasil: data
      })
    }
  })
}