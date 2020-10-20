const dataPegawai = require("../models").tbpegawai;
const dataUser = require("../models").tbuser;
const { handleError, ErrorHandler } = require("../helper/error");
const { Op } = require("sequelize");

exports.readAll = (req, res) =>{
  const limit = req.query.limit || 100;
  const page = req.query.page || 1;
  const offset = (page - 1) * limit;
  const search = req.query.search;

  const response = (data) => {
    const pages = Math.ceil(data.count / limit);
    res.status(200).send({
      limit: limit,
      offset: offset,
      page: `${page} dari ${pages} halaman`,
      data: data
    })
  }

  if(search) {
    dataPegawai.findAndCountAll({
      where: { 
        [Op.or]: [{ nama: {[Op.substring]: search } }] 
      },
      order: [["createdAt", "DESC"]],
      offset: offset,
      limit: limit,
      include: { model: dataUser, as: "userData", attributes: ["nama"] }
    })
    .then(data => {
      if (data.count == 0){
        handleError({statusCode: 404, message: "Pencarian tidak ada!"}, res);        
      } else {
        response(data)
      }
    })  
    .catch(err => {
      console.log(err)
    })  
  }else{
    //handleError({statusCode: 404, message: "Tipe pencarian tidak dikenal!"}, res);
    dataPegawai.findAndCountAll({
    //   where: { 
    //     [Op.or]: [{ nama: {[Op.substring]: search } }] 
    //   },
      order: [["createdAt", "DESC"]],
      offset: offset,
      limit: limit,
      include: { model: dataUser, as: "userData", attributes: ["nama"] }
    })
    .then(data => {
      // if (data.count == 0){
      //   handleError({statusCode: 404, message: "Pencarian tidak ada!"}, res);        
      // } else {
        response(data)
      //}
    })  
    .catch(err => {
      console.log(err)
    })
  }    
}

exports.create = (req, res) =>{
  const { nama, nip, tmp_lhr, tgl_lhr, status, penginputPeg } = req.body;
  dataPegawai.create({      
    nama,
    nip,    
    tmp_lhr,
    tgl_lhr,    
    status,
    penginputPeg
  })
  .then(data =>{
    res.status(201).send({
      pesan: "Pegawai berhasil ditambahkan!",
      hasil: data
    })
  })
  .catch(err => {
    console.log(err)
  })
};

exports.read = (req, res) => {
  const pegawaiId = req.params.pegawaiId;

  dataPegawai.findOne({
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

exports.update = (req, res) => {
  const pegawaiId = req.params.pegawaiId;

  dataPegawai.findOne({
    where: { id: pegawaiId }
  })
  .then(data => {
    if(!data) {
      handleError({statusCode: 404, message: "Pegawai tidak dapat diperbarui!"}, res);
    } else {
      dataPegawai.update(
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
        pesan: "Pegawai berhasil diperbarui!",
        hasil: data
      })
    }
  })
}

exports.destroy = (req, res) => {
  const pegawaiId = req.params.pegawaiId;

  dataPegawai.findOne({
    where: { id: pegawaiId }
  })
  .then(data => {
    if(!data) {
      handleError({statusCode: 404, message: "Pegawai tidak dikenal!"}, res);
    } else {
      dataPegawai.destroy({
          where: { id: pegawaiId }
      })
      res.status(200).send({
        pesan: "Pegawai berhasil dihapus!",
        hasil: data
      })
    }
  })
}