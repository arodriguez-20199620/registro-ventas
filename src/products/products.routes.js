import { Router } from "express";
import { check } from "express-validator";

// validations
import { validateFields } from "../middlewares/validate-fields.js";
import { notCategory } from "../helpers/categories-validations.js";
import { productExists, validatePrice } from "../helpers/products-validations.js";

// Controller
import { createProducts } from "./products.controller.js";


const router = Router();

router.post("/",
    [
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

export default router;