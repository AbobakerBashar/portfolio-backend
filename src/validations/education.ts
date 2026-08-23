import { body } from "express-validator";

export const educationValidation = [
	body("school").notEmpty().withMessage("School is required"),
	body("degree").notEmpty().withMessage("Degree is required"),
	body("period").notEmpty().withMessage("Period is required"),
	body("location").notEmpty().withMessage("Location is required"),
	body("description").notEmpty().withMessage("Description is required"),
	body("icon").notEmpty().withMessage("Icon is required"),
	body("color").notEmpty().withMessage("Color is required"),
];
