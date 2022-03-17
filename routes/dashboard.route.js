const router = require("express").Router();
const { isAuthenticated, isAdmin } = require("../middlewares/auth.middleware");
const { dashboardGetController } = require("../controllers/dashboard.controller");

router.get("/", isAuthenticated, isAdmin, dashboardGetController);

module.exports = router;
