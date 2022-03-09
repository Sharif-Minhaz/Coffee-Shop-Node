const router = require("express").Router();
const { checkoutPostController } = require("../controllers/checkout.controller");
const {isAuthenticated} = require("../middlewares/auth.middleware")

router.post("/", isAuthenticated, checkoutPostController);

module.exports = router;
