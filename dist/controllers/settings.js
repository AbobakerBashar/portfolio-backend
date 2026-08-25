import Settings from "../models/Settings.js";
import { v2 as cloudinary } from "cloudinary";
export const createSettings = async (req, res) => {
    try {
        const { profile, contact, socialLinks, resume, availability, typingTexts } = req.body;
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
            settings: {
                profile: settings.profile,
                contact: settings.contact,
                socialLinks: settings.socialLinks,
                resume: settings.resume,
                availability: settings.availability,
                typingTexts: settings.typingTexts,
            },
            success: true,
        });
    }
    catch (error) {
        if (typeof error === "object" &&
            error !== null &&
            "code" in error &&
            error.code === 11000) {
            return res.status(400).json({
                message: "App cannot have more that settings document",
                success: false,
            });
        }
        return res.status(500).json({
            message: "Internal server error",
            success: false,
            error: error.message,
        });
    }
};
export const getSettings = async (req, res) => {
    try {
        const settings = await Settings.findOne({ _key: "portfolio" });
        if (!settings)
            return res.status(404).json({
                message: "No setting found",
                success: false,
            });
        res.status(200).json({
            settings: {
                profile: settings.profile,
                contact: settings.contact,
                socialLinks: settings.socialLinks,
                resume: settings.resume,
                availability: settings.availability,
                typingTexts: settings.typingTexts,
            },
            success: true,
        });
    }
    catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            success: false,
            error: error.message,
        });
    }
};
export const updateSettings = async (req, res) => {
    try {
        const { profile, contact, socialLinks, resume, availability, typingTexts } = req.body;
        const settings = await Settings.findOneAndUpdate({ _key: "portfolio" }, {
            profile,
            contact,
            socialLinks,
            resume,
            availability,
            typingTexts,
        });
        if (!settings)
            return res.status(404).json({
                message: "Faild to update settings",
                success: false,
            });
        res.status(200).json({
            settings: {
                profile: settings.profile,
                contact: settings.contact,
                socialLinks: settings.socialLinks,
                resume: settings.resume,
                availability: settings.availability,
                typingTexts: settings.typingTexts,
            },
            success: true,
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Internal server error",
            success: false,
            error: error.message,
        });
    }
};
export const updateAvatar = async (req, res) => {
    try {
        const avatar = req.file;
        const uploadResult = await cloudinary.uploader.upload(avatar.path, {
            folder: "portfolio",
        });
        const url = uploadResult.secure_url;
        const settings = await Settings.findOneAndUpdate({ _key: "portfolio" }, {
            $set: {
                "profile.avatar": {
                    url,
                    publicId: uploadResult.public_id,
                },
            },
        }, {
            returnDocument: "after",
        });
        if (!settings)
            return res.status(404).json({
                message: "Faild to update settings avatar",
                success: false,
            });
        if (req.body.publicId)
            await cloudinary.uploader.destroy(req.body.publicId);
        res.status(200).json({
            settings: {
                profile: settings.profile,
                contact: settings.contact,
                socialLinks: settings.socialLinks,
                resume: settings.resume,
                availability: settings.availability,
                typingTexts: settings.typingTexts,
            },
            success: true,
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Internal server error",
            success: false,
            error: error.message,
        });
    }
};
export const updateResume = async (req, res) => {
    try {
        const resumeFile = req.file;
        const uploadResult = await cloudinary.uploader.upload(resumeFile.path, {
            folder: "portfolio",
        });
        const resume = {
            url: uploadResult.secure_url,
            publicId: uploadResult.public_id,
        };
        const settings = await Settings.findOneAndUpdate({ _key: "portfolio" }, {
            $set: {
                resume: resume,
            },
        }, {
            returnDocument: "after",
        });
        if (!settings)
            return res.status(404).json({
                message: "Faild to update settings avatar",
                success: false,
            });
        if (req.body.publicId)
            await cloudinary.uploader.destroy(req.body.publicId);
        res.status(200).json({
            settings: {
                profile: settings.profile,
                contact: settings.contact,
                socialLinks: settings.socialLinks,
                resume: settings.resume,
                availability: settings.availability,
                typingTexts: settings.typingTexts,
            },
            success: true,
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Internal server error",
            success: false,
            error: error.message,
        });
    }
};
