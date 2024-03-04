import { Router } from "express";
import { check } from "express-validator";

// Validations
import { emailExists, validatePassword, validateRole } from "../helpers/user-validations.js";
import { validateFields } from "../middlewares/validate-fields.js";

// Controller
import { register } from "./user.controller.js";

const router = Router()

router.post(
    "/",
    [
        check("email", "This is not a valid email").isEmail(),
        check("email").custom(emailExists),
        check("password").custom(validatePassword),
        check("firstname", "Enter your name").not().isEmpty(),
        check("lastname", "Enter your last name").not().isEmpty(),
        validateFields,
    ], register);

export default router