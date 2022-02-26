const Reservation = require("../models/Reservation.model");
const Profile = require("../models/Profile.model");

exports.reservationPostController = async (req, res, next) => {
	const { person, date, time } = req.body;
	const profile = await Profile.findOne({ user: req.user._id });
	if (!profile) {
		req.flash("fail", "Create profile to book a table");
		res.redirect("/profile/create-profile");
	}
	try {
		let reserve = new Reservation({
			person,
			date,
			time,
		});
		await reserve.save();
		req.flash("success", "Table reservation completed.");
		res.redirect("/profile/show-profile");
	} catch (err) {
		next(err);
	}
};
