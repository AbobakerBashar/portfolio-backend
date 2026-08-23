import { body } from "express-validator";

export const experienceValidation = [
	body("company").notEmpty().withMessage("Company is required"),
	body("position").notEmpty().withMessage("Position is required"),
	body("period").notEmpty().withMessage("Period is required"),
	body("type").notEmpty().withMessage("Type is required"),
	body("location").notEmpty().withMessage("Location is required"),
	body("description").notEmpty().withMessage("Description is required"),
	body("responsibilities")
		.isArray({ min: 1 })
		.withMessage("Responsibilities must be an array with at least one item"),
	body("tech")
		.isArray({ min: 1 })
		.withMessage("Tech must be an array with at least one item"),
	body("color").notEmpty().withMessage("Color is required"),
];
