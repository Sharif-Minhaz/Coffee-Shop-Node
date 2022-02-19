const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
require("dotenv").config();
const setRoutes = require("./routes/routes");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

const { MONGODB_CONNECTION_URI } = process.env;
const PORT = process.env.PORT || 5000;

// <==============<set all routes>==============> //
setRoutes(app);

mongoose
	.connect(MONGODB_CONNECTION_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		console.info("Connected to the Database");
		app.listen(PORT, () => {
			console.log(`Server running at http://localhost:${PORT}`);
		});
	})
	.catch((err) => console.error(err));
