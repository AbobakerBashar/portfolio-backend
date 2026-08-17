import { v2 as cloudinary } from "cloudinary";

import type { Request, Response } from "express";
import type {
	ProjectResponse,
	GetProjectsResponse,
	ProjectInput,
} from "../types/project.js";

import Project from "../models/Project.js";

export const createProject = async (
	req: Request<{}, unknown, ProjectInput>,
	res: Response<ProjectResponse>,
) => {
	try {
		const { title, description, category, tech, features, demo, github } =
			req.body;

		const file = req.file!;
		const uploadResult = await cloudinary.uploader.upload(file.path, {
			folder: "portfolio",
		});

		const url = uploadResult.secure_url;

		const project = await Project.create({
			title,
			description,
			category,
			tech,
			features,
			demo,
			github,
			image: url,
		});

		if (!project)
			return res.status(400).json({
				success: false,
				message: "Faild to create project",
			});

		const result = {
			id: project._id.toHexString(),
			title: project.title,
			category: project.category,
			description: project.description,
			tech: project.tech,
			features: project.features,
			demo: project.demo,
			github: project.github,
			image: project.image,
		};

		res.status(200).json({
			success: true,
			project: result,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: "Server error",
			errors: { error: (error as Error).message },
		});
	}
};

export const getAll = async (
	req: Request<{}, unknown, {}>,
	res: Response<GetProjectsResponse>,
) => {
	try {
		const projects = await Project.find();

		if (!projects)
			return res.status(404).json({
				message: "No project found",
				success: false,
			});
		const result = projects.map((p) => ({
			id: p._id.toString(),
			title: p.title,
			category: p.category,
			description: p.description,
			demo: p.demo,
			github: p.github,
			tech: p.tech,
			features: p.features,
			image: p.image,
		}));

		res.status(200).json({
			success: true,
			projects: result,
		});
	} catch (error) {
		res.status(500).json({
			message: "Internal server error.",
			success: false,
			error: (error as Error).message,
		});
	}
};

export const deleteProject = async (
	req: Request<{ id: string }>,
	res: Response,
) => {
	try {
		const project = await Project.findByIdAndDelete(req.params.id);
		if (!project)
			return res.status(404).json({
				message: "No project found",
				success: false,
			});

		res.status(200).json({
			success: true,
			message: "Project deleted successfuly!",
		});
	} catch (error) {
		res.status(500).json({
			message: "Internal server error",
			success: false,
			error: (error as Error).message,
		});
	}
};

export const getProjectById = async (
	req: Request<{ id: string }>,
	res: Response<ProjectResponse>,
) => {
	try {
		const project = await Project.findById(req.params.id);
		if (!project)
			return res.status(404).json({
				message: "No project found",
				success: false,
			});

		const result = {
			id: project._id.toString(),
			title: project.title,
			category: project.category,
			description: project.description,
			demo: project.demo,
			github: project.github,
			tech: project.tech,
			features: project.features,
			image: project.image,
		};

		res.status(200).json({
			success: true,
			project: result,
		});
	} catch (error) {
		res.status(500).json({
			message: "Internal server error",
			success: false,
			errors: {
				error: (error as Error).message,
			},
		});
	}
};

export const editProject = async (
	req: Request<{ id: string }, unknown, ProjectInput>,
	res: Response,
) => {
	try {
		const { title, description, category, tech, features, demo, github } =
			req.body;

		const project = await Project.findByIdAndUpdate(
			req.params.id,
			{
				title,
				description,
				category,
				tech,
				features,
				demo,
				github,
			},
			{ new: true, runValidators: true },
		);

		if (!project)
			return res.status(404).json({
				success: false,
				message: "Project not found",
			});

		const result = {
			id: project._id.toHexString(),
			title: project.title,
			category: project.category,
			description: project.description,
			tech: project.tech,
			features: project.features,
			demo: project.demo,
			github: project.github,
			image: project.image,
		};

		res.status(200).json({
			success: true,
			project: result,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: "Server error",
			errors: { error: (error as Error).message },
		});
	}
};

export const changeImage = async (
	req: Request<{ id: string }>,
	res: Response<ProjectResponse>,
) => {
	try {
		const id = req.params.id;
		const file = req.file!;
		const uploadResult = await cloudinary.uploader.upload(file.path, {
			folder: "portfolio",
		});

		const url = uploadResult.secure_url;

		const project = await Project.findByIdAndUpdate(id, { image: url });

		if (!project)
			return res.status(404).json({
				success: false,
				message: "Project not found.",
			});

		res.status(200).json({
			success: true,
			project: {
				id: project._id?.toString(),
				title: project.title,
				category: project.category,
				description: project.description,
				features: project.features,
				tech: project.tech,
				image: project.image,
				demo: project.demo,
				github: project.github,
			},
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: "Server error",
			errors: { error: (error as Error).message },
		});
	}
};
