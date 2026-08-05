import { Router } from "express";
import type { Router as RouterType } from "express";

import {
	createSkill,
	editSkill,
	getSkills,
	deleteSkill,
	getById,
} from "../controllers/skill.js";
import { validate } from "../middlewares/validate.js";
import { skillValidationRules } from "../validations/skill.js";

const router: RouterType = Router();

router.get("/", getSkills);
router.post("/", skillValidationRules, validate, createSkill);
router.put("/:id", skillValidationRules, validate, editSkill);
router.get("/:id", getById);
router.delete("/:id", deleteSkill);

export default router;
