import mongoose from "mongoose";
const portfolioSettingsSchema = new mongoose.Schema({
    profile: {
        name: {
            type: String,
            trim: true,
        },
        title: {
            type: String,
            trim: true,
        },
        bio: {
            type: String,
            trim: true,
        },
        avatar: String,
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
    },
    resume: {
        url: String,
    },
    availability: {
        status: {
            type: Boolean,
            default: true,
        },
        message: String,
    },
}, { timestamps: true });
const PortfolioSettings = mongoose.model("PortfolioSetting", portfolioSettingsSchema);
export default PortfolioSettings;
