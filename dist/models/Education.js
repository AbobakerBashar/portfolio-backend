import mongoose from "mongoose";
const educationSchema = new mongoose.Schema({
    school: { type: String, required: true },
    degree: { type: String, required: true },
    period: { type: String, required: true },
    location: { type: String, required: true },
    description: { type: String, required: true },
    icon: { type: String, required: true },
    color: { type: String, required: true },
});
const Education = mongoose.model("Education", educationSchema);
export default Education;
