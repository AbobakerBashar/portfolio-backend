import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();
export const createTransporter = () => nodemailer.createTransport({
    service: "gmail",
    auth: {
        pass: process.env.SMTP_PASS,
        user: process.env.SMTP_USER,
    },
});
