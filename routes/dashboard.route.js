const router = require("express").Router();
const { isAuthenticated, isAdmin } = require("../middlewares/auth.middleware");
const {
	dashboardGetController,
	subscribeGetController,
	deleteMailGetController,
} = require("../controllers/dashboard.controller");

router.get("/", isAuthenticated, isAdmin, dashboardGetController);
router.get("/subscription", isAuthenticated, isAdmin, subscribeGetController);
router.get("/deleteMail/:id", isAuthenticated, isAdmin, deleteMailGetController);

module.exports = router;
