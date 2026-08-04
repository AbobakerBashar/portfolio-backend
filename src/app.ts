import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(
	cors({
		origin: "http://localhost:3000",
		credentials: true,
	}),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (_, res) => {
	res.json({
		success: true,
		message: "Portfolio API is running",
	});
});

export default app;
