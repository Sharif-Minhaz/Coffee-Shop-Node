const router = require("express").Router();
const {
	createBlogGetController,
	createBlogPostPostController,
} = require("../controllers/blog.controller");
const { isAuthenticated } = require("../middlewares/auth.middleware");
const upload = require("../middlewares/upload.middleware");

router.get("/create", isAuthenticated, createBlogGetController);
router.post(
	"/create",
	isAuthenticated,
	upload.single("upload-thumbnail"),
	createBlogPostPostController
);

module.exports = router;
