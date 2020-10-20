const dataUser = require("../models").tbuser;
const bcrypt  = require("bcryptjs");
const salt = bcrypt.genSaltSync(10);
const { handleError, ErrorHandler } = require("../helper/error");
const { Op } = require("sequelize");

exports.signUp = (req, res) => {
  const { nama, username, email, hakAkses, foto } = req.body;

  dataUser.create({
    nama,
    username,
    email,
    hakAkses,
    password: bcrypt.hashSync(req.body.password, salt),
    foto
  })
  .then(data => {
    res.status(201).send({
      pesan: "User ditambahkan!",
      hasil: data
    })
  })
}

exports.signIn = (req, res) => {
  const user = dataUser.findOne({
    where: { username: req.body.username }
  })
  .then(data => {
    if(!data) {
      handleError({statusCode: 404, message: "username tidak terdaftar!"}, res);
    } else {
      const authorized = bcrypt.compareSync( req.body.password, data.password );
      if(authorized) {
        res.status(200).send({
          pesan: "Berhasil login",  
          hasil: data
        })
      } else {
        handleError({statusCode: 402, message: "Password salah!"}, res);  
      }
    }
  })
}

exports.readAll = (req, res) =>{
  dataUser.findAll()
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
  const { nama, username, email, hakAkses, foto } = req.body;
  dataUser.create({      
      nama,
      username,
      email,
      hakAkses,
      foto,
      password: bcrypt.hashSync(req.body.password, salt) 
    })
    .then(data =>{
        res.status(201).send({
          pesan: "User berhasil ditambahkan!",
          hasil: data
        })
    })
    .catch(err => {
      console.log(err)
    })
};

exports.read = (req, res) => {
  const userId = req.params.userId;

  dataUser.findOne({
    where: { id: userId}
  })
  .then(data => {
    if(!data) {
      handleError({statusCode: 404, message: "User tidak ditemukan!"}, res);
    } else {
      res.status(200).send({
        hasil: data
      })
    }
  })
}

exports.update = (req, res) => {
  const userId = req.params.userId;

  dataUser.findOne({
    where: { id: userId }
  })
  .then(data => {
    if(!data) {
      handleError({statusCode: 404, message: "User tidak dapat diperbarui!"}, res);
    } else {
      dataUser.update(
        {                 
          nama: req.body.nama,
          username: req.body.username,
          password: bcrypt.hashSync(req.body.password, salt), 
          email: req.body.email,
          hakAkses: req.body.hakAkses,
          foto: req.body.foto        
        },
        { where: { id: userId }
      })
      res.status(200).send({
        pesan: "User berhasil diperbarui!",
        hasil: data
      })
    }
  })
}

exports.destroy = (req, res) => {
  const userId = req.params.userId;

  dataUser.findOne({
    where: { id: userId }
  })
  .then(data => {
    if(!data) {
      handleError({statusCode: 404, message: "User tidak dikenal!"}, res);
    } else {
      dataUser.destroy({
          where: { id: userId }
      })
      res.status(200).send({
        pesan: "User berhasil dihapus!",
        hasil: data
      })
    }
  })
}