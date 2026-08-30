import dns from "node:dns";

dns.setDefaultResultOrder("ipv4first");

import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";
import { connectDB } from "./config/db.js";
import { connectCloudinary } from "./config/cloundinary.js";

const PORT = process.env.PORT || 5000;

const startServer = async () => {
	await connectDB();

	connectCloudinary();

	app.listen(PORT, () => {
		console.log(`Server running on port ${PORT}`);
	});
};

startServer();
