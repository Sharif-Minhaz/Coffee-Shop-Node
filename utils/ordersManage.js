const Checkout = require("../models/Checkout.model");

exports.gettingAllOrder = async (req, next) => {
	try {
		orders = await Checkout.find({ user: req.user._id });
        return orders;
	} catch (err) {
		return next(err);
	}
};
