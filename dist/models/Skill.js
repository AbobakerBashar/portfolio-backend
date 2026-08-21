import mongoose from "mongoose";
const skillSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Skill name is required"],
        trim: true,
        unique: true,
        maxlength: [50, "Skill name cannot exceed 50 characters"],
    },
    category: {
        type: String,
        required: true,
        enum: [
            "Frontend",
            "Backend",
            "Database",
            "DevOps",
            "Cloud",
            "Mobile",
            "Programming Language",
            "Tools",
            "Other",
        ],
    },
    proficiency: {
        type: Number,
        required: true,
        min: 0,
        max: 100,
    },
    icon: {
        type: String,
        trim: true,
    },
    featured: {
        type: Boolean,
        default: false,
    },
    order: {
        type: Number,
        default: 0,
    },
    color: {
        type: String,
        trim: true,
    },
}, {
    timestamps: true,
});
export default mongoose.model("Skill", skillSchema);
