import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
dotenv.config();
const app = express();
import skillRoutes from "./routes/skill.js";
import progectRoutes from "./routes/project.js";
import contactRoutes from "./routes/contact.js";
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
// PROJECT ROUTES
app.use("/api/contact", contactRoutes);
export default app;
