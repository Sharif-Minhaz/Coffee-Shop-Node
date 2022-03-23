const router = require("express").Router();
const { createBlogGetController } = require("../controllers/blog.controller");
const { isAuthenticated } = require("../middlewares/auth.middleware");

router.get("/create", isAuthenticated, createBlogGetController);

module.exports = router;
