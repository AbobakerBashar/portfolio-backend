import { validationResult } from "express-validator";
export const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            message: "Validation failed",
            errors: Object.fromEntries(Object.entries(errors.mapped()).map(([key, value]) => [key, value.msg])),
        });
    }
    next();
};
