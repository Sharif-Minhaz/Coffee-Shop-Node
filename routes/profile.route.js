const router = require("express").Router();
const {
	createProfileGetController,
	createProfilePostController,
} = require("../controllers/profile.controller");
const { isAuthenticated } = require("../middlewares/auth.middleware");

router.get("/create-profile", isAuthenticated, createProfileGetController);
router.post("/create-profile", isAuthenticated, createProfilePostController);

module.exports = router;
