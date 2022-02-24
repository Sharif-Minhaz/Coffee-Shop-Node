exports.createProfileGetController = (req, res, next) => {
	res.render("pages/profile/create-profile", {
		title: "Coffee Shop | Create Profile",
		flashMessage: {},
		errors: {},
	});
};

exports.createProfilePostController = async (req, res, next) => {
	res.send("Profile");
}