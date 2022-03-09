const Flash = require("../utils/Flash");

exports.checkoutPostController = async (req, res, next) => {
	// const { productName, productCount, price } = req.body;
	res.render("pages/checkout/checkout", {
		title: "Checkout Product",
		flashMessage: Flash.getMessage(req),
		productDetails: req.body
	});
};
