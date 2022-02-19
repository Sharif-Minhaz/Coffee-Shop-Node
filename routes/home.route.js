const router = require("express").Router();

router.get("/", (req, res) => {
	res.render("pages/home", { title: "Coffee Shop" });
});

module.exports = router;
