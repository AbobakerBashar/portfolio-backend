import LearningJourney from "../models/LearningJourney.js";
export const getAllLearningJourneys = async (req, res) => {
    try {
        const learningJourneys = await LearningJourney.find().sort({ order: 1 });
        if (!learningJourneys || learningJourneys.length === 0) {
            return res
                .status(404)
                .json({ success: false, message: "No learning journeys found" });
        }
        const resulte = learningJourneys.map((lj) => ({
            id: lj._id.toString(),
            title: lj.title,
            description: lj.description,
            year: lj.year,
            color: lj.color,
            order: lj.order,
        }));
        res.status(200).json({
            success: true,
            learningJourneys: resulte,
        });
    }
    catch (error) {
        console.error("Error fetching learning journeys:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};
export const getLearningJourneyById = async (req, res) => {
    try {
        const { id } = req.params;
        const learningJourney = await LearningJourney.findById(id);
        if (!learningJourney) {
            return res
                .status(404)
                .json({ success: false, message: "Learning journey not found" });
        }
        res.status(200).json({ success: true, learningJourney });
    }
    catch (error) {
        console.error("Error fetching learning journey:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};
export const createLearningJourney = async (req, res) => {
    try {
        const { title, description, year, color, order } = req.body;
        const learningJourney = await LearningJourney.create({
            title,
            description,
            year,
            color,
            order,
        });
        if (!learningJourney)
            return res
                .status(400)
                .json({ success: false, message: "Failed to create learning journey" });
        res.status(201).json({ success: true, learningJourney });
    }
    catch (error) {
        console.error("Error creating learning journey:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};
export const updateLearningJourney = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, year, color, order } = req.body;
        const updatedLearningJourney = await LearningJourney.findByIdAndUpdate(id, { title, description, year, color, order }, { returnDocument: "after" });
        if (!updatedLearningJourney) {
            return res
                .status(404)
                .json({ success: false, message: "Learning journey not found" });
        }
        res
            .status(200)
            .json({ success: true, learningJourney: updatedLearningJourney });
    }
    catch (error) {
        console.error("Error updating learning journey:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};
export const deleteLearningJourney = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedLearningJourney = await LearningJourney.findByIdAndDelete(id);
        if (!deletedLearningJourney) {
            return res
                .status(404)
                .json({ success: false, message: "Learning journey not found" });
        }
        res.status(200).json({
            success: true,
            message: "Learning journey deleted successfully",
        });
    }
    catch (error) {
        console.error("Error deleting learning journey:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};
