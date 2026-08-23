import type { Request, Response } from "express";
import type {
	EducationEntry,
	EducationRes,
	EducationsRes,
} from "../types/education.ts";
import Education from "../models/Education.js";

export const getEducations = async (
	req: Request,
	res: Response<EducationsRes>,
) => {
	try {
		const educations = await Education.find();

		if (!educations || educations.length === 0) {
			return res
				.status(404)
				.json({ success: false, message: "No education entries found" });
		}

		const educationEntries: (EducationEntry & { id: string })[] =
			educations.map((education) => ({
				school: education.school,
				degree: education.degree,
				period: education.period,
				location: education.location,
				description: education.description,
				icon: education.icon,
				color: education.color,
				id: education._id.toString(),
			}));

		res.status(200).json({
			success: true,
			educations: educationEntries,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: "Internal server error",
			errors: { error: (error as Error).message },
		});
	}
};

export const getEducation = async (
	req: Request<{ id: string }>,
	res: Response<EducationRes>,
) => {
	try {
		const education = await Education.findById(req.params.id);

		if (!education) {
			return res
				.status(404)
				.json({ success: false, message: "Education entry not found" });
		}

		const educationEntry: EducationEntry & { id: string } = {
			school: education.school,
			degree: education.degree,
			period: education.period,
			location: education.location,
			description: education.description,
			icon: education.icon,
			color: education.color,
			id: education._id.toString(),
		};

		res.status(200).json({
			success: true,
			education: educationEntry,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: "Internal server error",
			errors: { error: (error as Error).message },
		});
	}
};

export const addEducation = async (
	req: Request<{}, unknown, EducationEntry>,
	res: Response<EducationRes>,
) => {
	try {
		const { school, degree, period, location, description, icon, color } =
			req.body;

		const education = await Education.create({
			school,
			degree,
			period,
			location,
			description,
			icon,
			color,
		});

		if (!education) {
			return res
				.status(400)
				.json({ success: false, message: "Failed to add education entry" });
		}

		const educationEntry: EducationEntry & { id: string } = {
			school: education.school,
			degree: education.degree,
			period: education.period,
			location: education.location,
			description: education.description,
			icon: education.icon,
			color: education.color,
			id: education._id.toString(),
		};

		res.status(201).json({
			success: true,
			message: "Education entry added successfully",
			education: educationEntry,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: "Internal server error",
			errors: { error: (error as Error).message },
		});
	}
};

export const editEducation = async (
	req: Request<{ id: string }, unknown, EducationEntry>,
	res: Response<EducationRes>,
) => {
	try {
		const { school, degree, period, location, description, icon, color } =
			req.body;

		const education = await Education.findByIdAndUpdate(req.params.id, {
			school,
			degree,
			period,
			location,
			description,
			icon,
			color,
		});

		if (!education) {
			return res
				.status(404)
				.json({ success: false, message: "Education entry not found" });
		}

		const educationEntry: EducationEntry & { id: string } = {
			school: education.school,
			degree: education.degree,
			period: education.period,
			location: education.location,
			description: education.description,
			icon: education.icon,
			color: education.color,
			id: education._id.toString(),
		};

		res.status(201).json({
			success: true,
			message: "Education entry edited successfully",
			education: educationEntry,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: "Internal server error",
			errors: { error: (error as Error).message },
		});
	}
};

export const deleteEducation = async (
	req: Request<{ id: string }>,
	res: Response<EducationRes>,
) => {
	try {
		const education = await Education.findByIdAndDelete(req.params.id);

		if (!education) {
			return res
				.status(404)
				.json({ success: false, message: "Education entry not found" });
		}

		res.status(201).json({
			success: true,
			message: "Education entry deleted successfully",
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: "Internal server error",
			errors: { error: (error as Error).message },
		});
	}
};
