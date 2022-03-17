const Flash = require("../utils/Flash");

exports.checkoutGetController = (req, res, next) => {
	res.redirect('/menu/all');
}

exports.checkoutPostController = async (req, res, next) => {
	res.render("pages/checkout/checkout", {
		title: "Checkout Product",
		flashMessage: Flash.getMessage(req),
		productDetails: req.body,
		orders: req.session.orders,
	});
};
