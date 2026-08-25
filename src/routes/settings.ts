import { Router } from "express";
import {
	createSettings,
	getSettings,
	updateSettings,
	updateAvatar,
	updateResume,
} from "../controllers/settings.js";
import { checkAuth } from "../middlewares/auth.js";
import { settingsValidationRules } from "../validations/auth.js";
import { validate } from "../middlewares/validate.js";
import { upload } from "../middlewares/multer.js";
import { uploadImage } from "../middlewares/uploadImage.js";

const router = Router();

router.get("/", getSettings);
router.post("/", checkAuth, settingsValidationRules, validate, createSettings);
router.put("/", checkAuth, settingsValidationRules, validate, updateSettings);
router.patch(
	"/avatar",
	checkAuth,
	upload.single("avatar"),
	uploadImage,
	updateAvatar,
);
router.patch(
	"/resume",
	checkAuth,
	upload.single("resume"),
	uploadImage,
	updateResume,
);

export default router;
