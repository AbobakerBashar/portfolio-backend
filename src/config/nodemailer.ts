import nodemailer from "nodemailer";

import dotenv from "dotenv";

dotenv.config();

export const createTransporter = () =>
	nodemailer.createTransport({
		host: "smtp.gmail.com",
		port: 587,
		secure: false,
		auth: {
			pass: process.env.SMTP_PASS,
			user: process.env.SMTP_USER,
		},
	});
