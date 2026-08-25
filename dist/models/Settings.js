import mongoose from "mongoose";
const settingsSchema = new mongoose.Schema({
    _key: {
        type: String,
        unique: true,
        default: "portfolio",
        immutable: true,
    },
    profile: {
        name: {
            type: String,
            trim: true,
        },
        title: {
            type: String,
            trim: true,
        },
        tagline: {
            type: String,
            trim: true,
        },
        bio: {
            type: String,
            trim: true,
        },
        avatar: {
            url: String,
            publicId: String,
        },
    },
    contact: {
        email: String,
        phone: String,
        location: String,
    },
    socialLinks: {
        github: String,
        linkedin: String,
        twitter: String,
        instagram: String,
        website: String,
    },
    resume: {
        url: String,
        publicId: String,
    },
    availability: {
        status: {
            type: Boolean,
            default: true,
        },
        message: String,
    },
    typingTexts: {
        type: [String],
        default: [
            "Full-Stack JavaScript Developer",
            "Next.js & React Specialist",
            "Node.js Backend Engineer",
            "TypeScript Enthusiast",
        ],
    },
}, { timestamps: true });
const Settings = mongoose.model("PortfolioSetting", settingsSchema);
export default Settings;
