import type { Request, Response, NextFunction } from "express";

export const parseProjectData = (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		if (req.body?.tech) {
			if (typeof req.body.tech === "string") {
				req.body.tech = JSON.parse(req.body.tech);
			}
		} else {
			return res.status(400).json({
				message: "At least one tech is required.",
			});
		}

		if (req.body?.features) {
			if (typeof req.body.features === "string") {
				req.body.features = JSON.parse(req.body.features);
			}
		} else {
			return res.status(400).json({
				message: "At least one feature is required.",
			});
		}
	} catch (error) {
		return res.status(500).json({
			message: "Server error",
			errors: {
				error: (error as Error).message,
			},
		});
	}
	next();
};
