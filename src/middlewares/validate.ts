import { validationResult } from "express-validator";

import type { Request, Response, NextFunction } from "express";
import type { ValidationError, Result } from "express-validator";
import type { ErrorResponse } from "../types/common.ts";

export const validate = (
	req: Request,
	res: Response<ErrorResponse>,
	next: NextFunction,
) => {
	const errors: Result<ValidationError> = validationResult(req);

	if (!errors.isEmpty()) {
		return res.status(400).json({
			success: false,
			errors: Object.fromEntries(
				Object.entries(errors.mapped()).map(([key, value]) => [key, value.msg]),
			),
		});
	}

	next();
};
