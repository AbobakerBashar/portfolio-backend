import type { Request, Response } from "express";
import type { ContactInput, CreateContactRes } from "../types/contact.ts";
import Contact from "../models/Contact.js";

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

		res.status(201).json({
			success: true,
			message: "Contact created successfully!",
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
