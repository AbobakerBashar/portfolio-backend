import dotenv from "dotenv";
dotenv.config();

import nodemailer from "nodemailer";

export const createTransporter = () => {
	return nodemailer.createTransport({
		host: "smtp.gmail.com",
		port: 587,
		secure: false,
		auth: {
			user: process.env.SMTP_USER!,
			pass: process.env.SMTP_PASS!,
		},
	});
};
