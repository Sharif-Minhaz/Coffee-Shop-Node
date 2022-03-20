const Flash = require("../utils/Flash");

let orders;

exports.checkoutGetController = (req, res, next) => {
	res.redirect('/menu/all');
}

exports.checkoutPostController = async (req, res, next) => {
	// calling gettingAllOrder
	gettingAllOrder(req, next);
	res.render("pages/checkout/checkout", {
		title: "Checkout Product",
		flashMessage: Flash.getMessage(req),
		productDetails: req.body,
		orders,
	});
};

// getting orders 
const gettingAllOrder = async (req, next) => {
	try {
		orders = await Checkout.find({ user: req.user._id });
	} catch (err) {
		next(err);
	}
}