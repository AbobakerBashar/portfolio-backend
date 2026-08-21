import { body } from "express-validator";

export const aboutValidationRules = [
	body("heading")
		.trim()
		.notEmpty()
		.withMessage("Heading is required")
		.isLength({ max: 100 })
		.withMessage("Heading cannot exceed 100 characters"),

	body("intro")
		.trim()
		.notEmpty()
		.withMessage("Introduction is required")
		.isLength({ max: 500 })
		.withMessage("Introduction cannot exceed 500 characters"),

	body("background")
		.trim()
		.notEmpty()
		.withMessage("Background is required")
		.isLength({ max: 1000 })
		.withMessage("Background cannot exceed 1000 characters"),

	body("mindset")
		.trim()
		.notEmpty()
		.withMessage("Mindset is required")
		.isLength({ max: 1000 })
		.withMessage("Mindset cannot exceed 1000 characters"),

	body("careerGoal")
		.trim()
		.notEmpty()
		.withMessage("Career goal is required")
		.isLength({ max: 1000 })
		.withMessage("Career goal cannot exceed 1000 characters"),
];
