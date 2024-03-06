import { Router } from "express";
import { check } from "express-validator";

//validations
import { validateFields } from "../middlewares/validate-fields.js";
import { categoryExists } from "../helpers/categories-validations.js";

//controller
import { createCategories } from "./categories.controller.js";

const router = Router();

router.post(
    "/",
    [
        check("name", "Enter a name for the category.").notEmpty(),
        check("name", "Invalid category name format.")
            .matches(/^[a-zA-Z0-9\s]+$/)
            .withMessage("Category name can only contain letters, numbers, and spaces.")
            .isLength({ min: 3, max: 50 })
            .withMessage("Category name must be between 3 and 50 characters."),
        check("name").custom(categoryExists),
        validateFields,
    ], createCategories);

export default router