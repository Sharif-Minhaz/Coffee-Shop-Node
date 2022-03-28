const router = require("express").Router();
const {
	createBlogGetController,
	createBlogPostPostController,
	allBlogsGetController,
} = require("../controllers/blog.controller");
const { isAuthenticated } = require("../middlewares/auth.middleware");
const blogValidator = require("../validator/blog.validator");
const upload = require("../middlewares/upload.middleware");

router.get("/", allBlogsGetController);
router.get("/create", isAuthenticated, createBlogGetController);
router.post(
	"/create",
	isAuthenticated,
	blogValidator,
	upload.single("upload-thumbnail"),
	createBlogPostPostController
);

module.exports = router;
