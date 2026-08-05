import { body } from "express-validator";

export const skillValidationRules = [
	body("name").notEmpty().withMessage("Name is required"),
	body("category")
		.notEmpty()
		.withMessage("Category is required")
		.isIn([
			"Frontend",
			"Backend",
			"Database",
			"DevOps",
			"Cloud",
			"Mobile",
			"Programming Language",
			"Tools",
			"Other",
		])
		.withMessage(
			"Invalid category. Category must be one of these (Frontend, Backend, base,	DevOps, Cloud, Mobile, Programming Language, Tools, Other)",
		),
	body("proficiency")
		.notEmpty()
		.withMessage("Proficiency is required")
		.isInt({ min: 0, max: 100 })
		.withMessage("Proficiency must be an integer between 0 and 100"),
	body("icon").optional().isString().withMessage("Icon must be a string"),
	body("featured")
		.optional()
		.isBoolean()
		.withMessage("Featured must be a boolean"),
	body("order").optional().isInt().withMessage("Order must be an integer"),
];
