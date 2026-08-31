import type { Request, Response } from "express";
import type { ContactInput, CreateContactRes } from "../types/contact.ts";
import Contact from "../models/Contact.js";
import { sendEmail } from "../config/resend.js";

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

		await sendEmail({
			subject,
			replyTo: email,
			html: `
        <h2>New Contact Message</h2>

        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>

        <h3>Message</h3>
        <p>${message}</p>
      `,
		});

		res.status(201).json({
			success: true,
			message: "Email sent successfully!",
		});
	} catch (error) {
		console.error("Error creating contact:", error);
		res.status(500).json({
			success: false,
			message: "Internal server error.",
			errors: {
				error: (error as Error).message,
			},
		});
	}
};
