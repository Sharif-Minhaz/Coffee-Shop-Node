const router = require("express").Router();
const {
	menuGetController,
	menuAddPostController,
	checkoutProduct,
	productAddPostController,
} = require("../controllers/menu.controller");
const { isAdmin } = require("../middlewares/auth.middleware");

router.get("/all", menuGetController);

router.post("/all", checkoutProduct);
router.post("/add-menu", isAdmin, menuAddPostController);
router.post("/add-product", isAdmin, productAddPostController);

module.exports = router;
