import { body } from "express-validator";

export const learningJourneyValidation = [
	body("title").notEmpty().withMessage("Title is required"),
	body("description").notEmpty().withMessage("Description is required"),
	body("year").notEmpty().withMessage("Year is required"),
	body("color").notEmpty().withMessage("Color is required"),
	body("order").isInt().withMessage("Order must be an integer"),
];
