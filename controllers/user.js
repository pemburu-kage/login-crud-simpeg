const Users = require("../models").tbuser;
const bcrypt  = require("bcryptjs");
const salt = bcrypt.genSaltSync(10);
const { handleError, ErrorHandler } = require("../helper/error");

// exports.signUp = (req, res) => {
// const { nama, username, email, hakAkses, foto*/ } = req.body;

//   Users.create({
//     nama,
//     username,
//     email,
//     hakAkses,
//     password: bcrypt.hashSync(req.body.password, salt)/*,
//     foto: req.body.foto*/
//   })
//   .then(data => {
//     res.status(201).send({
//       message: "User ditambahkan",
//       users: data
//     })
//   })
// }

exports.signIn = (req, res) => {
  const user = Users.findOne({
    where: { email: req.body.email }
  })
  .then(data => {
    if(!data) {
      handleError({statusCode: 404, message: "Email tidak terdaftar!!"}, res);
    } else {
      const authorized = bcrypt.compareSync( req.body.password, data.password );
      if(authorized) {
        res.status(200).send({
          message: "Berhasil login",  
          user: data
        })
      } else {
        handleError({statusCode: 402, message: "Password salah!"}, res);  
      }
    }
  })
}

exports.readAllUsers = (req, res) =>{
  Users.findAll()
  .then(data =>{
    res.status(200).send({
      users: data
    })
  })
  .catch(err => {
    console.log(err)
  })   
}

exports.createUsers = (req, res) =>{
  const { nama, username, email, hakAkses, foto } = req.body;
    Users.create({      
      nama,
      username,
      email,
      hakAkses,
      foto,
      password: bcrypt.hashSync(req.body.password, salt) 
    })
    .then(data =>{
        res.status(201).send({
          message: "User berhasil ditambahkan",
          users: data
        })
    })
    .catch(err => {
      console.log(err)
    })
};

exports.readUserById = (req, res) => {
  const userId = req.params.userId;

  Users.findOne({
    where: { id: userId}
  })
  .then(data => {
    if(!data) {
      handleError({statusCode: 404, message: "User tidak ditemukan!"}, res);
    } else {
      res.status(200).send({
        user: data
      })
    }
  })
}

exports.updateUser = (req, res) => {
  const userId = req.params.userId;

  Users.findOne({
    where: { id: userId }
  })
  .then(data => {
    if(!data) {
      handleError({statusCode: 404, message: "User tidak dapat diperbarui!"}, res);
    } else {
      Users.update(
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
        pesan: "User berhasil di perbarui",
        jumlah_objek: data
      })
    }
  })
}

exports.deleteUser = (req, res) => {
  const userId = req.params.userId;

  Users.findOne({
    where: { id: userId }
  })
  .then(data => {
    if(!data) {
      handleError({statusCode: 404, message: "User tidak dikenal!"}, res);
    } else {
      Users.destroy({
          where: { id: userId }
      })
      res.status(200).send({
        pesan: "User berhasil di hapus",
        jumlah_objek: data
      })
    }
  })
}