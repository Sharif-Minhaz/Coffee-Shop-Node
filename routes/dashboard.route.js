const router = require("express").Router();
const upload = require("../middlewares/upload.middleware")
const { isAuthenticated, isAdmin } = require("../middlewares/auth.middleware");
const {
	dashboardGetController,
	subscribeGetController,
	deleteMailGetController,
	editItemGetController,
	deleteItemGetController,
	editItemPostController,
} = require("../controllers/dashboard.controller");

router.get("/", isAuthenticated, isAdmin, dashboardGetController);
router.get("/subscription", isAuthenticated, isAdmin, subscribeGetController);
router.get("/deleteMail/:id", isAuthenticated, isAdmin, deleteMailGetController);

router.get("/edit-item", isAuthenticated, isAdmin, editItemGetController);
router.get("/deleteItem/:id", isAuthenticated, isAdmin, deleteItemGetController);

router.post(
	"/edit-item",
	isAuthenticated,
	isAdmin,
	upload.single("changedImg"),
	editItemPostController
);

module.exports = router;
