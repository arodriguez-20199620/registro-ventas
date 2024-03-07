import { Router } from "express";
import { check } from "express-validator";

// validations
import { validateFields } from "../middlewares/validate-fields.js";
import { notCategory } from "../helpers/categories-validations.js";
import { productExists, validatePrice, productExistsById } from "../helpers/products-validations.js";
import { validateToken } from "../middlewares/validate-token.js";
import { validateUserRole } from "../middlewares/validate-role.js"

// Controller
import { createProducts, viewCatalog, searchProduct, editProducts, deleteProducts } from "./products.controller.js";

const router = Router();

router.get("/", viewCatalog);

router.get('/:productId',
    [
        check("productId", "The id is not a valid MongoDB format").isMongoId(),
        check("productId").custom(productExistsById),
        validateFields,
    ], searchProduct);

router.post("/",
    [
        validateToken,
        validateUserRole('ADMIN'),
        check("name").custom(productExists),
        check("name", "Name is required").not().isEmpty(),
        check("name", "Name must be between 2 and 50 characters").isLength({ min: 2, max: 50 }),
        check("price", "Price is required").not().isEmpty(),
        check("price", "Price must be a valid number").isNumeric(),
        check("price").custom(validatePrice),
        check("stock", "Stock must be a valid number").isNumeric(),
        check("category").custom(notCategory),
        validateFields,
    ], createProducts)

router.put('/:productId',
    [
        validateToken,
        validateUserRole('ADMIN'),
        check("productId", "The id is not a valid MongoDB format").isMongoId(),
        check("productId").custom(productExistsById),
        check("name").custom(productExists),
        check("name", "Name is required").not().isEmpty(),
        check("name", "Name must be between 2 and 50 characters").isLength({ min: 2, max: 50 }),
        check("price", "Price is required").not().isEmpty(),
        check("price", "Price must be a valid number").isNumeric(),
        check("price").custom(validatePrice),
        check("stock", "Stock must be a valid number").isNumeric(),
        check("category").custom(notCategory),
        validateFields,
    ], editProducts);

router.delete('/:productId',
    [
        validateToken,
        validateUserRole('ADMIN'),
        check("productId", "The id is not a valid MongoDB format").isMongoId(),
        check("productId").custom(productExistsById),
        validateFields,
    ], deleteProducts);

export default router;