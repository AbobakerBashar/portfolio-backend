import type { Request, Response } from "express";
import Experience from "../models/Experience.js";
import type {
	ExperienceResponse,
	ExperiencesResponse,
	ExperienceEntry,
} from "../types/experience.js";

export const getAllExperiences = async (
	_: Request,
	res: Response<ExperiencesResponse>,
) => {
	try {
		const experiences = await Experience.find();

		if (!experiences || experiences.length === 0) {
			return res.status(404).json({
				success: false,
				message: "No experiences found.",
			});
		}

		const experiencesWithId = experiences.map((experience) => ({
			...experience.toObject(),
			id: experience._id.toString(),
		}));

		res.json({
			success: true,
			experiences: experiencesWithId,
		});
	} catch (error) {
		console.error("Error fetching experiences:", error);
		res.status(500).json({
			success: false,
			message: "An error occurred while fetching experiences.",
		});
	}
};

export const addExperience = async (
	req: Request<{}, {}, ExperienceEntry>,
	res: Response<ExperienceResponse>,
) => {
	try {
		const {
			company,
			location,
			description,
			color,
			position,
			period,
			type,
			tech,
			responsibilities,
		} = req.body;
		const newExperience = await Experience.create({
			company,
			location,
			description,
			color,
			position,
			period,
			type,
			tech,
			responsibilities,
		});

		if (!newExperience) {
			return res.status(400).json({
				success: false,
				message: "Failed to create a new experience.",
			});
		}
		res.status(200).json({
			success: true,
			experience: {
				...newExperience.toObject(),
				id: newExperience._id.toString(),
			},
		});
	} catch (error) {
		console.error("Error adding experience:", error);
		res.status(500).json({
			success: false,
			message: "An error occurred while adding the experience.",
		});
	}
};

export const editExperience = async (
	req: Request<{ id: string }, {}, ExperienceEntry>,
	res: Response<ExperienceResponse>,
) => {
	try {
		const {
			company,
			location,
			description,
			color,
			position,
			period,
			type,
			tech,
			responsibilities,
		} = req.body;
		const newExperience = await Experience.findByIdAndUpdate(req.params.id, {
			company,
			location,
			description,
			color,
			position,
			period,
			type,
			tech,
			responsibilities,
		});

		if (!newExperience) {
			return res.status(400).json({
				success: false,
				message: "Failed to update a new experience.",
			});
		}
		res.status(200).json({
			success: true,
			experience: {
				...newExperience.toObject(),
				id: newExperience._id.toString(),
			},
		});
	} catch (error) {
		console.error("Error adding experience:", error);
		res.status(500).json({
			success: false,
			message: "An error occurred while updating the experience.",
		});
	}
};

export const deleteExperience = async (
	req: Request<{ id: string }>,
	res: Response<ExperienceResponse>,
) => {
	try {
		const newExperience = await Experience.findByIdAndDelete(req.params.id);

		if (!newExperience) {
			return res.status(400).json({
				success: false,
				message: "Failed to delete a new experience.",
			});
		}
		res.status(204).json({
			success: true,
			message: "Experience deleted successfully.",
		});
	} catch (error) {
		console.error("Error adding experience:", error);
		res.status(500).json({
			success: false,
			message: "An error occurred while deleting the experience.",
		});
	}
};
