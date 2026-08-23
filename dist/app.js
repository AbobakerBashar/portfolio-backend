import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
dotenv.config();
const app = express();
import skillRoutes from "./routes/skill.js";
import progectRoutes from "./routes/project.js";
import contactRoutes from "./routes/contact.js";
import authtRoutes from "./routes/admin.js";
import settingsRoutes from "./routes/settings.js";
import aboutRoutes from "./routes/about.js";
import learningJourneyRoutes from "./routes/learningJourney.js";
import educationRoutes from "./routes/education.js";
import experienceRoutes from "./routes/experience.js";
// MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE"],
}));
app.get("/", (_, res) => {
    res.json({
        success: true,
        message: "Portfolio API is running correctly",
    });
});
// Skills Routes
app.use("/api/skills", skillRoutes);
// PROJECT ROUTES
app.use("/api/projects", progectRoutes);
// CONTACT ROUTES
app.use("/api/contact", contactRoutes);
// SETTINGS ROUTES
app.use("/api/settings", settingsRoutes);
// AUTH ROUTES
app.use("/api/admin", authtRoutes);
// ABOUT ROUTES
app.use("/api/about", aboutRoutes);
// LEARNING JOURNEY ROUTES
app.use("/api/journeys", learningJourneyRoutes);
// EDUCATION ROUTES
app.use("/api/education", educationRoutes);
// EXPERIENCE ROUTES
app.use("/api/experience", experienceRoutes);
export default app;
