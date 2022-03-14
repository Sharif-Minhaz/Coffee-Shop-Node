const router = require("express").Router();
const { menuGetController, menuAddPostController } = require("../controllers/menu.controller");
const { isAdmin } = require("../middlewares/auth.middleware");

router.get("/all", menuGetController);

router.post("/all", checkoutProduct);
router.post("/menu", isAdmin, menuAddPostController);
router.post("/product", isAdmin, productAddPostController);

module.exports = router;
