exports.menuGetController = (req, res, next) => {
	res.render("pages/menu/menu", { title: "Coffee Shop | Menu", flashMessage: {}, orders: {} });
};
