module.exports = () => {
	return (req, res, next) => {
		res.locals.user = req.user;
		res.locals.orders = req.orders;
		res.locals.isLoggedIn = req.session.isLoggedIn || false;
		next();
	};
};
