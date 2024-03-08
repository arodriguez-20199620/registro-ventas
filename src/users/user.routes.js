import { Router } from "express";
import { check } from "express-validator";

// Validations
import { emailExists, validatePassword, validateRole } from "../helpers/user-validations.js";
import { validateFields } from "../middlewares/validate-fields.js";
import { validateToken } from "../middlewares/validate-token.js";
import { validateUserRole } from "../middlewares/validate-role.js"
// Controllers
import { register } from "./user.controller.js";
import { login } from "../auth/auth.controller.js";

const router = Router()

router.post(
    '/login',
    [
        check('email', 'Please enter your email.').not().isEmpty(),
        check('password', 'Please enter your password.').not().isEmpty(),
        validateFields,
    ], login)


router.post(
    "/",
    [
        validateToken,
        validateUserRole('ADMIN'),
        check("email", "This is not a valid email").isEmail(),
        check("email").custom(emailExists),
        check("password").custom(validatePassword),
        check("firstname", "Enter your name").not().isEmpty(),
        check("lastname", "Enter your last name").not().isEmpty(),
        check("role").custom(validateRole),
        validateFields,
    ], register);

router.post(
    "/register",
    [
        check("email", "This is not a valid email").isEmail(),
        check("email").custom(emailExists),
        check("password").custom(validatePassword),
        check("firstname", "Enter your name").not().isEmpty(),
        check("lastname", "Enter your last name").not().isEmpty(),
        validateFields,
    ], register);

export default router