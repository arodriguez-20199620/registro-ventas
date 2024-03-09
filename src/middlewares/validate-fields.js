import { validationResult } from "express-validator";
import Products from "../products/products.model.js";

export const validateFields = (req, res, next) => {
    try {
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(400).json(error);
        }
    } catch (error) {
        throw error
    }

    next();
}


