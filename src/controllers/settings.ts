import type { Request, Response } from "express";
import Settings from "../models/Settings.js";
import type { ISettingsRes, ISettings } from "../types/auth.ts";
import { v2 as cloudinary } from "cloudinary";
import { url } from "inspector/promises";

export const createSettings = async (
	req: Request<{}, unknown, ISettings>,
	res: Response<ISettingsRes>,
) => {
	try {
		const { profile, contact, socialLinks, resume, availability, typingTexts } =
			req.body;

		const settings = await Settings.create({
			profile,
			contact,
			socialLinks,
			resume,
			availability,
			typingTexts,
		});

		if (!settings)
			return res.status(404).json({
				message: "Faild to create settings",
				success: false,
			});

		res.status(200).json({
			settings,
			success: true,
		});
	} catch (error) {
		if (
			typeof error === "object" &&
			error !== null &&
			"code" in error &&
			error.code === 11000
		) {
			return res.status(400).json({
				message: "App cannot have more that settings document",
				success: false,
			});
		}

		return res.status(500).json({
			message: "Internal server error",
			success: false,
			error: (error as Error).message,
		});
	}
};

export const getSettings = async (
	req: Request,
	res: Response<ISettingsRes>,
) => {
	try {
		const settings = await Settings.findOne({ _key: "portfolio" });

		if (!settings)
			return res.status(404).json({
				message: "No setting found",
				success: false,
			});

		res.status(200).json({
			settings,
			success: true,
		});
	} catch (error) {
		return res.status(500).json({
			message: "Internal server error",
			success: false,
			error: (error as Error).message,
		});
	}
};

export const updateSettings = async (
	req: Request<{}, unknown, ISettings>,
	res: Response<ISettingsRes>,
) => {
	try {
		const { profile, contact, socialLinks, resume, availability, typingTexts } =
			req.body;

		const settings = await Settings.findOneAndUpdate(
			{ _key: "portfolio" },
			{
				profile,
				contact,
				socialLinks,
				resume,
				availability,
				typingTexts,
			},
		);

		if (!settings)
			return res.status(404).json({
				message: "Faild to update settings",
				success: false,
			});

		res.status(200).json({
			settings,
			success: true,
		});
	} catch (error) {
		res.status(500).json({
			message: "Internal server error",
			success: false,
			error: (error as Error).message,
		});
	}
};

export const updateAvatar = async (
	req: Request,
	res: Response<ISettingsRes>,
) => {
	try {
		const avatar = req.file!;

		const uploadResult = await cloudinary.uploader.upload(avatar.path, {
			folder: "portfolio",
		});
		const url = uploadResult.secure_url;

		const settings = await Settings.findOneAndUpdate(
			{ _key: "portfolio" },
			{
				$set: {
					"profile.avatar": {
						url,
						publicId: uploadResult.public_id,
					},
				},
			},
			{
				returnDocument: "after",
			},
		);

		if (!settings)
			return res.status(404).json({
				message: "Faild to update settings avatar",
				success: false,
			});

		if (req.body.publicId) await cloudinary.uploader.destroy(req.body.publicId);

		res.status(200).json({
			settings,
			success: true,
		});
	} catch (error) {
		res.status(500).json({
			message: "Internal server error",
			success: false,
			error: (error as Error).message,
		});
	}
};

export const updateResume = async (
	req: Request,
	res: Response<ISettingsRes>,
) => {
	try {
		const resumeFile = req.file!;

		const uploadResult = await cloudinary.uploader.upload(resumeFile.path, {
			folder: "portfolio",
		});
		const resume = {
			url: uploadResult.secure_url,
			publicId: uploadResult.public_id,
		};

		const settings = await Settings.findOneAndUpdate(
			{ _key: "portfolio" },
			{
				$set: {
					resume: resume,
				},
			},
			{
				returnDocument: "after",
			},
		);

		if (!settings)
			return res.status(404).json({
				message: "Faild to update settings avatar",
				success: false,
			});

		if (req.body.publicId) await cloudinary.uploader.destroy(req.body.publicId);

		res.status(200).json({
			settings,
			success: true,
		});
	} catch (error) {
		res.status(500).json({
			message: "Internal server error",
			success: false,
			error: (error as Error).message,
		});
	}
};
