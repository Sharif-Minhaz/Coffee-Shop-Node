const router = require("express").Router();
const {
	loginGetController,
	loginPostController,
	signupGetController,
	signupPostController,
} = require("../controllers/auth.controller");

router.get("/login", loginGetController);
router.post("/login", loginPostController);

router.get("/signup", signupGetController);
router.post("/signup", signupPostController);

module.exports = router;
