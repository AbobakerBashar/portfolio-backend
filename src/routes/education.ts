import { Router } from "express";
import {
	getEducations,
	getEducation,
	addEducation,
	editEducation,
	deleteEducation,
} from "../controllers/education.js";
import { educationValidation } from "../validations/education.js";
import { validate } from "../middlewares/validate.js";
import { checkAuth } from "../middlewares/auth.js";



const router = Router();

router.get("/", getEducations);
router.get("/:id", getEducation);
router.post("/", checkAuth, educationValidation, validate, addEducation);
router.put("/:id", checkAuth, educationValidation, validate, editEducation);
router.delete("/:id", checkAuth, deleteEducation);

export default router;
