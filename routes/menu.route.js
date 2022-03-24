const router = require("express").Router();
const {
	menuGetController,
	menuAddPostController,
	singleMenuGetController,
} = require("../controllers/menu.controller");
const { isAdmin } = require("../middlewares/auth.middleware");
const upload = require("../middlewares/upload.middleware");

router.get("/all", menuGetController);

router.post("/add-menu", isAdmin, upload.single("item"), menuAddPostController);

router.get("/view/:id", singleMenuGetController);

module.exports = router;
