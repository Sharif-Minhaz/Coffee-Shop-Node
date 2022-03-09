const router = require("express").Router();
const { checkoutPostController } = require("../controllers/checkout.controller");

router.get("/", checkoutPostController);

module.exports = router;
