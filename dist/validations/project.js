import { body } from "express-validator";
export const projectValidationRules = [
    body("title")
        .trim()
        .notEmpty()
        .withMessage("Title is required")
        .isLength({ min: 3, max: 100 })
        .withMessage("Title must be between 3 and 100 characters"),
    body("category")
        .trim()
        .notEmpty()
        .withMessage("Category is required")
        .isIn(["Full Stack", "Frontend", "Backend"])
        .withMessage("Invalid category"),
    body("description")
        .trim()
        .notEmpty()
        .withMessage("Description is required")
        .isLength({ min: 20, max: 2000 })
        .withMessage("Description must be between 20 and 2000 characters"),
    body("tech")
        .isArray({ min: 1 })
        .withMessage("At least one technology is required"),
    body("tech.*").trim().notEmpty().withMessage("Technology cannot be empty"),
    body("features")
        .isArray({ min: 1 })
        .withMessage("At least one feature is required"),
    body("features.*").trim().notEmpty().withMessage("Feature cannot be empty"),
    body("github")
        .trim()
        .notEmpty()
        .withMessage("GitHub URL is required")
        .isURL()
        .withMessage("GitHub must be a valid URL"),
    body("demo")
        .trim()
        .notEmpty()
        .withMessage("Demo URL is required")
        .isURL()
        .withMessage("Demo must be a valid URL"),
];
