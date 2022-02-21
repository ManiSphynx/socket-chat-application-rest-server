const { Router } = require("express");
const { userController } = require("../controllers");
const router = Router();

router.post("/", userController.createUsers);

router.get("/", userController.getUsers);

router.put("/", userController.updateUsers);

router.delete("/", userController.deleteUsers);

module.exports = router;
