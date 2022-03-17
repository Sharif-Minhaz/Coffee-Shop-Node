const router = require("express").Router();
const { isAuthenticated, isAdmin } = require("../middlewares/auth.middleware");
const {
	dashboardGetController,
	subscribeGetController,
} = require("../controllers/dashboard.controller");

router.get("/", isAuthenticated, isAdmin, dashboardGetController);
router.get("/subscription", isAuthenticated, isAdmin, subscribeGetController);

module.exports = router;
