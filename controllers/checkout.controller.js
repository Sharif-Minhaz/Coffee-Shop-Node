const Flash = require("../utils/Flash");

exports.checkoutPostController = async (req, res, next) => {
	res.render("pages/checkout/checkout", {
		title: "Checkout Product",
		flashMessage: Flash.getMessage(req),
	});
};
