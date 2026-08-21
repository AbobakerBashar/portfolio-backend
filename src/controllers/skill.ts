import type { Request, Response } from "express";

import type { SkillType } from "../types/skill.ts";
import type { ErrorResponse } from "../types/common.ts";
import Skill from "../models/Skill.js";

export const getSkills = async (
	req: Request,
	res: Response<{ success: boolean; skills: SkillType[] } | ErrorResponse>,
) => {
	try {
		const skills = await Skill.find().sort({ order: 1 }).exec();

		const result = skills.map((skill) => ({
			id: skill._id.toString(),
			name: skill.name,
			category: skill.category,
			proficiency: skill.proficiency,
			icon: skill.icon,
			featured: skill.featured,
			order: skill.order,
		})) as SkillType[];

		res.status(200).json({
			success: true,
			skills: result,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: "An error occurred while fetching skills",
			errors: { error: (error as Error).message },
		});
	}
};
export const getById = async (
	req: Request<{ id: string }>,
	res: Response<{ success: boolean; skill: SkillType } | ErrorResponse>,
) => {
	try {
		const skill = await Skill.findById(req.params.id);

		if (!skill)
			return res.status(404).json({
				message: "Skill not found",
				success: false,
			});

		const result = {
			id: skill._id.toString(),
			name: skill.name,
			category: skill.category,
			proficiency: skill.proficiency,
			icon: skill.icon || undefined,
			featured: skill.featured,
			order: skill.order,
			color: skill.color,
		};

		res.status(200).json({
			success: true,
			skill: result,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: "An error occurred while fetching skills",
			errors: { error: (error as Error).message },
		});
	}
};

// Create
export const createSkill = async (
	req: Request<{}, unknown, SkillType>,
	res: Response<{ success: boolean; skill: SkillType } | ErrorResponse>,
) => {
	try {
		const { name, category, proficiency, icon, featured, order, color } =
			req.body;
		const skill = await Skill.create({
			name,
			category,
			proficiency,
			icon,
			featured,
			order,
			color,
		});

		const result: SkillType = {
			id: skill._id.toString(),
			name: skill.name,
			category: skill.category,
			proficiency: skill.proficiency,
			icon: skill.icon || undefined,
			featured: skill.featured,
			order: skill.order,
			color: skill.color!,
		};

		res.status(201).json({
			success: true,
			skill: result,
		});
	} catch (error) {
		if ((error as any).code === 11000) {
			return res.status(400).json({
				success: false,
				message: "Skill already exists",
				errors: { name: "Skill with the given name already exists" },
			});
		}
		res.status(500).json({
			success: false,
			message: "An error occurred while creating skill",
			errors: { error: (error as Error).message },
		});
	}
};

// Edit Skill
export const editSkill = async (
	req: Request<{ id: string }, unknown, SkillType, {}>,
	res: Response<{ success: boolean; skill: SkillType } | ErrorResponse>,
) => {
	const id = req.params.id;
	const { name, category, proficiency, icon, featured, order, color } =
		req.body;

	try {
		const skill = await Skill.findByIdAndUpdate(id, {
			name,
			category,
			proficiency,
			icon,
			featured,
			order,
			color,
		});

		if (!skill) {
			return res.status(400).json({
				success: false,
				message: "Skill not found",
				errors: { id: "Skill with the given ID does not exist" },
			});
		}

		res.status(200).json({
			success: true,
			skill: {
				id: skill._id.toString(),
				name: skill.name,
				category: skill.category || "",
				proficiency: skill.proficiency || 0,
				icon: skill.icon || undefined,
				featured: skill.featured,
				order: skill.order,
				color: skill.color || "",
			},
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: "An error occurred while editing skill",
			errors: { error: (error as Error).message },
		});
	}
};

// Delete Skill
export const deleteSkill = async (
	req: Request<{ id: string }>,
	res: Response<{ success: boolean; message: string } | ErrorResponse>,
) => {
	try {
		const id = req.params.id;
		const skill = await Skill.findByIdAndDelete(id);

		if (!skill) {
			return res.status(400).json({
				success: false,
				message: "Skill not found",
				errors: { id: "Skill with the given ID does not exist" },
			});
		}

		res.status(200).json({
			success: true,
			message: "Skill deleted successfully",
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: "An error occurred while deleting skill",
			errors: { error: (error as Error).message },
		});
	}
};
