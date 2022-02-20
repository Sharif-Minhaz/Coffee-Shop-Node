const router = require("express").Router();
const {
	loginGetController,
	loginPostController,
	signupGetController,
	signupPostController,
} = require("../controllers/auth.controller");

const loginValidator = require("../validator/login.validator");
const signupValidator = require("../validator/signup.validator");

router.get("/login", loginGetController);
router.post("/login", loginValidator, loginPostController);

router.get("/signup", signupGetController);
router.post("/signup", signupValidator, signupPostController);

module.exports = router;
