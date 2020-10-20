module.exports = function(app){
    const controller = require("../controllers/user");

    app.get("/api/simpeg/user", controller.readAllUsers);
    app.post("/api/simpeg/user", controller.createUsers);
    app.get("/api/simpeg/user/:userId", controller.readUserById);
    app.put("/api/simpeg/user/:userId", controller.updateUser);
    app.delete("/api/simpeg/user/:userId", controller.deleteUser);
    
    app.get("/api/simpeg/signup", controller.signUp);
    app.post("/api/simpeg/signin", controller.signIn);
}

const express = require('express');
const router = express.Router();
const controller = require("../controllers/user");

router.get("/", controller.readAll);
router.post("/", controller.create);
router.get("/:userId", controller.read);
router.put("/:userId", controller.update);
router.delete("/:userId", controller.destroy);
router.get("/signup", controller.signUp);
router.post("/signin", controller.signIn);

module.exports = router;