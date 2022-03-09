const router = require("express").Router();
const { checkoutPostController } = require("../controllers/checkout.controller");

router.post("/", checkoutPostController);

module.exports = router;
