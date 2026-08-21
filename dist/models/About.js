import mongoose from "mongoose";
const aboutSchema = new mongoose.Schema({
    heading: {
        type: String,
        required: true,
    },
    intro: {
        type: String,
        required: true,
    },
    background: {
        type: String,
        required: true,
    },
    mindset: {
        type: String,
        required: true,
    },
    careerGoal: {
        type: String,
        required: true,
    },
    image: {
        url: {
            type: String,
            required: true,
        },
        publicId: {
            type: String,
            required: true,
        },
    },
    _key: {
        type: String,
        unique: true,
        default: "about",
        immutable: true,
    },
}, { timestamps: true });
const About = mongoose.model("About", aboutSchema);
export default About;
