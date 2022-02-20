const homeRoute = require("./home.route");
const authRoute = require("./auth.route");

const routes = [
	{
		path: "/",
		handler: homeRoute,
	},
	{
		path: "/auth",
		handler: authRoute,
	}
];

/**
 * Takes in an array of routes and adds them to the app.
 * @param app - the express app to add the routes to.
 * @returns None
 */
module.exports = (app) => {
	routes.forEach((route) => {
		route.path == "/" ? app.get(route.path, route.handler) : app.use(route.path, route.handler);
	});
};
