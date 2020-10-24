// authorization middlewares
// disin pengecekan, role2 mana aja yang dapat mengakses route2 tertentu

module.exports = async function authorizeRole (roles = []) {
    return async function (req, res, next) {
      try {
        // disini logic untuk pengecekan roles
        // cara penggunaan fungsi ini
        // ada di file routes/golpang.js pada controller read all
        next();
      } catch (err) {
        next(err);
      }
    }
  }