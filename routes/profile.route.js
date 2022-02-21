const router = require("express").Router();
const { createProfileGetController } = require("../controllers/profile.controller");
const { isAuthenticated } = require("../middlewares/auth.middleware");

router.get("/create-profile", isAuthenticated, createProfileGetController);

module.exports = router;
