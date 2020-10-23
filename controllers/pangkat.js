const dataPangkat = require("../models").tbpangkat;
const dataPegawai = require("../models").tbpegawai;
const dataGolpang = require("../models").tbgolpang;
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
      dataPangkat.findAndCountAll({
        where: { 
          [Op.or]: [{ idnip: {[Op.substring]: search } }] 
        },
        order: [["createdAt", "DESC"]],
        offset: offset,
        limit: limit,
        include: [
                  { model: dataPegawai, as: "pegawaiData", attributes: dataPegawai.data },
                  { model: dataGolpang, as: "golpangData", attributes: ["golongan","pangkat"] }
                 ]
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
      dataPangkat.findAndCountAll({
        order: [["createdAt", "DESC"]],
        offset: offset,
        limit: limit,
        include: [
                  { model: dataPegawai, as: "pegawaiData", attributes: dataPegawai.data },
                  { model: dataGolpang, as: "golpangData", attributes: ["golongan","pangkat"] }
                 ]
      })
      .then(data => {
          response(data)
      })  
      .catch(err => {
        console.log(err)
      })
    }    
}  

exports.create = (req, res) =>{
  const { idnip, idgolpang, tmt, glr_dpn, glr_blkng, mkptahun, mkpbulan, nomorsk, tglsk, oleh, prodi, tahun } = req.body;
  dataPangkat.create({      
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
      pesan: "Pangkat berhasil ditambahkan!",
      hasil: data
    })
  })
  .catch(err => {
    console.log(err)
  })
};

exports.read = (req, res) => {
  const pangkatId = req.params.pangkatId;

  dataPangkat.findOne({
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

exports.update = (req, res) => {
  const pangkatId = req.params.pangkatId;

  dataPangkat.findOne({
    where: { id: pangkatId }
  })
  .then(data => {
    if(!data) {
      handleError({statusCode: 404, message: "Pangkat tidak dapat diperbarui!"}, res);
    } else {
      dataPangkat.update(
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
        pesan: "Pangkat berhasil diperbarui!",
        hasil: data
      })
    }
  })
}

exports.destroy = (req, res) => {
  const pangkatId = req.params.pangkatId;

  dataPangkat.findOne({
    where: { id: pangkatId }
  })
  .then(data => {
    if(!data) {
      handleError({statusCode: 404, message: "Pangkat tidak dikenal!"}, res);
    } else {
      dataPangkat.destroy({
          where: { id: pangkatId }
      })
      res.status(200).send({
        pesan: "Pangkat berhasil dihapus!",
        hasil: data
      })
    }
  })
}