const router = require("express").Router();
const { isAuthenticated, isAdmin } = require("../middlewares/auth.middleware");
const {
	dashboardGetController,
	subscribeGetController,
	deleteMailGetController,
	editItemGetController,
	deleteItemGetController,
} = require("../controllers/dashboard.controller");

router.get("/", isAuthenticated, isAdmin, dashboardGetController);
router.get("/subscription", isAuthenticated, isAdmin, subscribeGetController);
router.get("/deleteMail/:id", isAuthenticated, isAdmin, deleteMailGetController);

router.get("/edit-item", isAuthenticated, isAdmin, editItemGetController);
router.get("/deleteItem/:id", isAuthenticated, isAdmin, deleteItemGetController);

module.exports = router;
