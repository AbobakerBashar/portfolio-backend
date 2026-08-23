import Education from "../models/Education.js";
export const getEducations = async (req, res) => {
    try {
        const educations = await Education.find();
        if (!educations || educations.length === 0) {
            return res
                .status(404)
                .json({ success: false, message: "No education entries found" });
        }
        const educationEntries = educations.map((education) => ({
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
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error",
            errors: { error: error.message },
        });
    }
};
export const getEducation = async (req, res) => {
    try {
        const education = await Education.findById(req.params.id);
        if (!education) {
            return res
                .status(404)
                .json({ success: false, message: "Education entry not found" });
        }
        const educationEntry = {
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
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error",
            errors: { error: error.message },
        });
    }
};
export const addEducation = async (req, res) => {
    try {
        const { school, degree, period, location, description, icon, color } = req.body;
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
        const educationEntry = {
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
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error",
            errors: { error: error.message },
        });
    }
};
export const editEducation = async (req, res) => {
    try {
        const { school, degree, period, location, description, icon, color } = req.body;
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
        const educationEntry = {
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
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error",
            errors: { error: error.message },
        });
    }
};
export const deleteEducation = async (req, res) => {
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
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error",
            errors: { error: error.message },
        });
    }
};
