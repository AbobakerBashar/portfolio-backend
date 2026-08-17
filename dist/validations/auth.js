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
