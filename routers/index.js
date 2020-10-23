const express = require('express')

const router  = express.Router()

router.get('/halo', (req, res, next) => {
  return res.status(200).json({ message: 'success' });
})

router.use('/golpang', require('./golpang'));
router.use('/pangkat', require('./pangkat'));
router.use('/pegawai', require('./pegawai'));
router.use('/user', require('./user'));


module.exports = router;