exports.menuGetController = (req, res, next) => {
	res.render("pages/menu/menu", {
		title: "Coffee Shop | Menu",
		flashMessage: {},
		orders: req.session.orders,
	});
};

exports.menuAddPostController = (req, res, next) => {
	res.send("Add menu");
};

exports.checkoutProduct = (req, res, next) => {
	res.send("Checkout product");
};

exports.productAddPostController = (req, res, next) => {
	res.send("add product");
}