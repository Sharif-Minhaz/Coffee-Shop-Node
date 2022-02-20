exports.loginGetController = (req, res, next) => {
	res.render("pages/auth/login", { title: "Coffee Shop | Login" });
};

exports.loginPostController = (req, res, next) => {
	res.render("pages/auth/login", { title: "Coffee Shop | Login"})
}

exports.signupGetController = (req, res, next) => {
	res.render("pages/auth/signup", { title: "Coffee Shop | Signup"})
}

exports.signupPostController = (req, res, next) => {
	res.render("pages/auth/signup", { title: "Coffee Shop | Signup"})
}