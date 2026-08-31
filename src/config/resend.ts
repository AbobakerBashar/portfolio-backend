import { Resend } from "resend";
import dotenv from "dotenv";
dotenv.config();

const resend = new Resend(process.env.RESET_API_KEY);

export const sendEmail = async ({
	subject,
	replyTo,
	html,
}: {
	subject: string;
	html: string;
	replyTo: string;
}) => {
	const { data, error } = await resend.emails.send({
		from: "onboarding@resend.dev",
		to: process.env.EMAIL!,
		subject,
		replyTo,
		html,
	});

	if (error) {
		throw new Error(error.message);
	}

	return data;
};
