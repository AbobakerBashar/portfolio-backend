import mongoose from "mongoose";
const projectSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true,
        trim: true,
    },
    category: {
        type: String,
        require: true,
        trim: true,
        enum: ["Full Stack", "Frontend", "Backend"],
    },
    description: {
        type: String,
        require: true,
        trim: true,
    },
    tech: {
        type: [String],
        require: true,
        trim: true,
    },
    features: {
        type: [String],
        require: true,
        trim: true,
    },
    image: {
        type: String,
        require: true,
        trim: true,
    },
    github: {
        type: String,
        require: true,
        trim: true,
    },
    demo: {
        type: String,
        require: true,
        trim: true,
    },
}, { timestamps: true });
const Project = mongoose.model("Project", projectSchema);
export default Project;
