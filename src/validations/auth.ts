import { body } from "express-validator";

export const registerValidationRules = [
	body("name")
		.trim()
		.notEmpty()
		.withMessage("Name is required")
		.isLength({ min: 2, max: 50 })
		.withMessage("Name must be between 2 and 50 characters"),

	body("email")
		.trim()
		.notEmpty()
		.withMessage("Email is required")
		.isEmail()
		.withMessage("Please provide a valid email address")
		.normalizeEmail(),

	body("password")
		.trim()
		.notEmpty()
		.withMessage("Subject is required")
		.isLength({ min: 8, max: 20 })
		.withMessage("Password must be between 8 and 20 characters"),
];

export const loginValidationRules = [
	body("email")
		.trim()
		.notEmpty()
		.withMessage("Email is required")
		.isEmail()
		.withMessage("Please provide a valid email address")
		.normalizeEmail(),

	body("password").trim().notEmpty().withMessage("Subject is required"),
];

export const settingsValidationRules = [
	// Profile
	body("profile.name")
		.optional()
		.trim()
		.isString()
		.withMessage("Name must be a string")
		.isLength({ min: 2, max: 100 })
		.withMessage("Name must be between 2 and 100 characters"),

	body("profile.title")
		.optional()
		.trim()
		.isString()
		.withMessage("Title must be a string")
		.isLength({ min: 2, max: 150 })
		.withMessage("Title must be between 2 and 150 characters"),

	body("profile.bio")
		.optional()
		.trim()
		.isString()
		.withMessage("Bio must be a string")
		.isLength({ max: 1000 })
		.withMessage("Bio cannot exceed 1000 characters"),

	body("profile.avatar.url")
		.optional({ values: "falsy" })
		.isURL()
		.withMessage("Avatar must be a valid URL"),

	// Contact
	body("contact.email")
		.optional()
		.trim()
		.normalizeEmail()
		.isEmail()
		.withMessage("Please provide a valid email address"),

	body("contact.phone")
		.optional({ values: "falsy" })
		.trim()
		.customSanitizer((value) => value.replace(/\s+/g, ""))
		.isMobilePhone("any")
		.withMessage("Please provide a valid phone number"),

	body("contact.location")
		.optional()
		.trim()
		.isString()
		.withMessage("Location must be a string")
		.isLength({ max: 150 })
		.withMessage("Location cannot exceed 150 characters"),

	// Social links
	body("socialLinks.github")
		.optional({ values: "falsy" })
		.isURL()
		.withMessage("GitHub must be a valid URL"),

	body("socialLinks.linkedin")
		.optional({ values: "falsy" })
		.isURL()
		.withMessage("LinkedIn must be a valid URL"),

	body("socialLinks.twitter")
		.optional({ values: "falsy" })
		.isURL()
		.withMessage("Twitter must be a valid URL"),

	body("socialLinks.instagram")
		.optional({ values: "falsy" })
		.isURL()
		.withMessage("Instagram must be a valid URL"),

	body("socialLinks.website")
		.optional({ values: "falsy" })
		.isURL()
		.withMessage("Website must be a valid URL"),

	// Resume
	body("resume.url")
		.optional({ values: "falsy" })
		.isURL()
		.withMessage("Resume URL must be a valid URL"),

	// Availability
	body("availability.status")
		.optional()
		.isBoolean()
		.withMessage("Availability status must be a boolean")
		.toBoolean(),

	body("availability.message")
		.optional()
		.trim()
		.isString()
		.withMessage("Availability message must be a string")
		.isLength({ max: 200 })
		.withMessage("Availability message cannot exceed 200 characters"),

	// Typing texts
	body("typingTexts")
		.optional()
		.isArray({ min: 1, max: 10 })
		.withMessage("Typing texts must contain between 1 and 10 items"),

	body("typingTexts.*")
		.optional()
		.trim()
		.isString()
		.withMessage("Each typing text must be a string")
		.isLength({ min: 2, max: 100 })
		.withMessage("Each typing text must be between 2 and 100 characters"),
];
