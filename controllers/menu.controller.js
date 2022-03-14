exports.menuGetController = (req, res, next) => {
	res.render("pages/menu/menu", {
		title: "Coffee Shop | Menu",
		flashMessage: {},
		orders: req.session.orders,
	});
};

exports.menuAddPostController = (req, res, next) => {
	res.send("nothing");
}