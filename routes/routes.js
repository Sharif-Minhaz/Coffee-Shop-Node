const homeRoute = require("./home.route");
const authRoute = require("./auth.route");
const profileRoute = require("./profile.route");
const uploadRoute = require("./upload.route");
const menuRoute = require("./menu.route");
const reservationRoute = require("./reservation.route");
const subscribeRoute = require("./subscribe.route");
const checkoutRoute = require("./checkout.route");

const routes = [
	{
		path: "/",
		handler: homeRoute,
	},
	{
		path: "/auth",
		handler: authRoute,
	},
	{
		path: "/profile",
		handler: profileRoute,
	},
	{
		path: "/menu",
		handler: menuRoute,
	},
	{
		path: "/reservation",
		handler: reservationRoute,
	},
	{
		path: "/subscribe",
		handler: subscribeRoute,
	},
	{
		path: "/checkout",
		handler: checkoutRoute,
	},
	{
		path: "/uploads",
		handler: uploadRoute,
	},
];

/**
 * Takes in an array of routes and adds them to the app.
 * @param app - the express app to add the routes to.
 * @returns None
 */
module.exports = (app) => {
	routes.forEach((route) => {
		app.use(route.path, route.handler);
		// route.path == "/" ? app.get(route.path, route.handler) : app.use(route.path, route.handler);
	});
};
