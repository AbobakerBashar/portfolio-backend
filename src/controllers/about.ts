import type { Request, Response } from "express";
import type { AboutResponse, AboutType } from "../types/about.ts";
import About from "../models/About.js";
import { v2 as cloudinary } from "cloudinary";

export const createAbout = async (
	req: Request<{}, unknown, AboutType>,
	res: Response<AboutResponse>,
) => {
	try {
		const { heading, intro, background, mindset, careerGoal } = req.body;
		const imageFile = req.file!;
		const uploadResult = await cloudinary.uploader.upload(imageFile.path, {
			folder: "portfolio",
		});

		const about = await About.create({
			heading,
			intro,
			background,
			mindset,
			careerGoal,
			image: {
				url: uploadResult.secure_url,
				publicId: uploadResult.public_id,
			},
		});

		if (!about)
			return res.status(400).json({
				success: false,
				message: "Fails to create about",
			});

		res.status(200).json({
			success: true,
			about: {
				heading: about.heading,
				intro: about.intro,
				background: about.background,
				mindset: about.mindset,
				careerGoal: about.careerGoal,
				image: {
					url: about.image?.url?.toString(),
					publicId: about.image?.publicId?.toString(),
				},
			},
		});
	} catch (error) {
		if (
			typeof error === "object" &&
			error !== null &&
			"code" in error &&
			error.code === 11000
		) {
			return res.status(400).json({
				success: false,
				errors: { error: "About already exists" },
				message: "About already exists",
			});
		} else
			return res.status(500).json({
				success: false,
				errors: { error: (error as Error).message },
				message: "Internal server error",
			});
	}
};

export const getAbout = async (req: Request, res: Response<AboutResponse>) => {
	try {
		const about = await About.findOne({ _key: "about" });
		if (!about)
			return res.status(404).json({
				success: false,
				message: "About not found",
			});

		res.status(200).json({
			success: true,
			about: {
				heading: about.heading,
				intro: about.intro,
				background: about.background,
				mindset: about.mindset,
				careerGoal: about.careerGoal,
				image: {
					url: about.image?.url?.toString(),
					publicId: about.image?.publicId?.toString(),
				},
			},
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			errors: { error: (error as Error).message },
			message: "Internal server error",
		});
	}
};

export const updateAbout = async (
	req: Request<{ image: string }>,
	res: Response<AboutResponse>,
) => {
	try {
		const { heading, intro, background, mindset, careerGoal, image } = req.body;

		const about = await About.findOneAndUpdate(
			{ _key: "about" },
			{
				heading,
				intro,
				background,
				mindset,
				careerGoal,
				image,
			},
		);

		if (!about)
			return res.status(400).json({
				success: false,
				message: "Fails to update about",
			});

		res.status(200).json({
			success: true,
			about: {
				heading: about.heading,
				intro: about.intro,
				background: about.background,
				mindset: about.mindset,
				careerGoal: about.careerGoal,
				image: {
					url: about.image?.url?.toString(),
					publicId: about.image?.publicId?.toString(),
				},
			},
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			errors: { error: (error as Error).message },
			message: "Internal server error",
		});
	}
};

export const updateAboutImage = async (
	req: Request<{}, unknown, { image: string }>,
	res: Response<AboutResponse>,
) => {
	try {
		const imageFile = req.file!;
		const uploadResult = await cloudinary.uploader.upload(imageFile.path, {
			folder: "portfolio",
		});

		const about = await About.findOneAndUpdate(
			{ _key: "about" },
			{
				$set: {
					"image.url": uploadResult.secure_url,
					"image.publicId": uploadResult.public_id,
				},
			},
		);

		if (!about)
			return res.status(404).json({
				success: false,
				message: "About not found",
			});

		if (about.image.publicId)
			await cloudinary.uploader.destroy(about.image.publicId?.toString() || "");

		res.status(200).json({
			success: true,
			about: {
				heading: about.heading,
				intro: about.intro,
				background: about.background,
				mindset: about.mindset,
				careerGoal: about.careerGoal,
				image: {
					url: about.image?.url?.toString(),
					publicId: about.image?.publicId?.toString(),
				},
			},
		});
	} catch (error) {
		console.error("Error updating about image:", error);
		res.status(500).json({
			success: false,
			errors: { error: (error as Error).message },
			message: "Internal server error",
		});
	}
};
