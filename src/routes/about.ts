import { Router } from "express";
import { upload } from "../middlewares/multer.js";
import { uploadImage } from "../middlewares/uploadImage.js";
import {
	createAbout,
	getAbout,
	updateAbout,
	updateAboutImage,
} from "../controllers/about.js";
import { aboutValidationRules } from "../validations/about.js";
import { validate } from "../middlewares/validate.js";
import { checkAuth } from "../middlewares/auth.js";

const router = Router();

router.post(
	"/",
	checkAuth,
	upload.single("image"),
	uploadImage,
	aboutValidationRules,
	validate,
	createAbout,
);

router.get("/", getAbout);

router.put("/", checkAuth, aboutValidationRules, validate, updateAbout);

router.patch(
	"/image",
	checkAuth,

	upload.single("image"),
	uploadImage,
	updateAboutImage,
);

export default router;
