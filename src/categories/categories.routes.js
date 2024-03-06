import { Router } from "express";
import { check } from "express-validator";

//validations
import { validateFields } from "../middlewares/validate-fields.js";
import { categoryExists, categoryExistsById } from "../helpers/categories-validations.js";
import { validateToken } from "../middlewares/validate-token.js";
import { validateUserRole } from "../middlewares/validate-role.js"

//controller
import { createCategories, editCategories, deleteCategories, getCategories} from "./categories.controller.js";

const router = Router();

router.get("/", getCategories);

router.post(
    "/",
    [
        check("name").custom(categoryExists),
        check("name", "Enter a name for the category.").notEmpty(),
        check("name", "Invalid category name format.")
            .matches(/^[a-zA-Z0-9\s]+$/)
            .withMessage("Category name can only contain letters, numbers, and spaces.")
            .isLength({ min: 3, max: 50 })
            .withMessage("Category name must be between 3 and 50 characters."),
        validateFields,
    ], createCategories);

router.put('/:categoryId',
    [
        validateToken,
        validateUserRole('ADMIN'),
        check("categoryId", "The id is not a valid MongoDB format").isMongoId(),
        check("categoryId").custom(categoryExistsById),
        check("name").custom(categoryExists),
        check("name", "Enter a name for the category.").notEmpty(),
        check("name", "Invalid category name format.")
            .matches(/^[a-zA-Z0-9\s]+$/)
            .withMessage("Category name can only contain letters, numbers, and spaces.")
            .isLength({ min: 3, max: 50 })
            .withMessage("Category name must be between 3 and 50 characters."),
        validateFields,
    ], editCategories);

router.delete('/:categoryId',
    [
        validateToken,
        validateUserRole('ADMIN'),
        check("categoryId", "The id is not a valid MongoDB format").isMongoId(),
        check("categoryId").custom(categoryExistsById),
        validateFields
    ], deleteCategories)

export default router