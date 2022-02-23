const router = require("express").Router();
const { menuGetController } = require("../controllers/menu.controller");

router.get("/all", menuGetController);

module.exports = router;
