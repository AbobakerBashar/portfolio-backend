import mongoose from "mongoose";
const learningJourneySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    year: {
        type: String,
        required: true,
    },
    color: {
        type: String,
        required: true,
    },
    order: {
        type: Number,
        required: true,
    },
});
const LearningJourney = mongoose.model("LearningJourney", learningJourneySchema);
export default LearningJourney;
