import type { Request, Response } from "express";
import type { ContactInput, CreateContactRes } from "../types/contact.ts";
import Contact from "../models/Contact.js";
import { createTransporter } from "../config/nodemailer.js";

import dotenv from "dotenv";

dotenv.config();

import Mailgen from "mailgen";

export const createContact = async (
	req: Request<{}, unknown, ContactInput>,
	res: Response<CreateContactRes>,
) => {
	const { name, email, subject, message } = req.body;

	try {
		const contact = await Contact.create({
			name,
			email,
			subject,
			message,
		});

		if (!contact)
			return res.status(400).json({
				message: "Faild to create contact",
				success: false,
			});

		const transporter = createTransporter();
		const mailGenerator = new Mailgen({
			theme: "default",
			product: {
				name: "Abobaker's Portfolio",
				link: process.env.FRONTEND_URL!,
			},
		});
		const emailContent = {
			body: {
				greeting: "Hello Abobaker",
				intro: "You received a new message from your portfolio.",
				table: {
					data: [
						{
							Name: name,
							Email: email,
							Subject: subject,
						},
					],
				},
				outro: message,
			},
		};

		const html = mailGenerator.generate(emailContent);

		await transporter.sendMail({
			from: process.env.SMTP_USER,
			to: process.env.SMTP_USER,
			replyTo: email,
			subject: `Portfolio Contact: ${subject}`,
			html,
		});

		res.status(201).json({
			success: true,
			message: "Email sent successfully!",
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: "Internal server error.",
			errors: {
				error: (error as Error).message,
			},
		});
	}
};
