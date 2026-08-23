import mongoose from "mongoose";
import type { ExperienceEntry } from "../types/experience.ts";

const experienceSchema = new mongoose.Schema<ExperienceEntry>({
	company: {
		type: String,
		required: true,
	},
	position: {
		type: String,
		required: true,
	},
	period: {
		type: String,
		required: true,
	},
	type: {
		type: String,
		required: true,
	},
	location: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	responsibilities: {
		type: [String],
		required: true,
	},
	tech: {
		type: [String],
		required: true,
	},
	color: {
		type: String,
		required: true,
	},
});

const Experience = mongoose.model("Experience", experienceSchema);

export default Experience;
