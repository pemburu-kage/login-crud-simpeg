// verifytoken middleware
// terkait pengecekan token valid atau tidak
// jika tidak valid maka akan ada validasi

// example
module.exports = async function verifyToken(req, res, next) {
  try {
    // disini logic untuk pengecekan token login
    // cara penggunaan fungsi ini
    // ada di file routes/golpang.js pada controller read all
    // jadi di panggil setiap route, dengan cara ini jadi lebih dinamis, yaitu route2 mana aja yang perlu pengecekan
    // atau route2 mana aja yang private access, dan global access
    next();
  } catch (err) {
    return next(err);
  }
}