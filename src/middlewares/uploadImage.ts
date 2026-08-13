import { Request, Response, NextFunction } from "express";

export const uploadImage = (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	if (!req.file) {
		return res.status(400).json({
			success: false,
			message: "Image is required",
		});
	}

	next();
};
