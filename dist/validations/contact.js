import { body } from "express-validator";
export const contactValidationRules = [
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
    body("subject")
        .trim()
        .notEmpty()
        .withMessage("Subject is required")
        .isLength({ min: 3, max: 100 })
        .withMessage("Subject must be between 3 and 100 characters"),
    body("message")
        .trim()
        .notEmpty()
        .withMessage("Message is required")
        .isLength({ min: 10, max: 1000 })
        .withMessage("Message must be between 10 and 1000 characters"),
];
