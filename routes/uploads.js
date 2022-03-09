const { Router } = require("express");
const { fileUpload } = require("../controllers/uploads");
const router = Router();

router.post("/", fileUpload);

module.exports = router;
