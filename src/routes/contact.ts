import { Router } from "express";
import { createContact } from "../controllers/contact.js";
import { contactValidationRules } from "../validations/contact.js";
import { validate } from "../middlewares/validate.js";

const router = Router();

router.post("/", contactValidationRules, validate, createContact);

export default router;
