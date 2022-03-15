const router = require("express").Router();
const {
	menuGetController,
	menuAddPostController,
	checkoutProduct,
	productAddPostController,
} = require("../controllers/menu.controller");
const { isAdmin } = require("../middlewares/auth.middleware");
const upload = require("../middlewares/upload.middleware")

router.get("/all", menuGetController);

router.post("/all", checkoutProduct);
router.post("/add-menu", isAdmin, upload.single("menu"), menuAddPostController);
router.post("/add-product", isAdmin, productAddPostController);

module.exports = router;
