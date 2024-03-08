import Products from "../products/products.model.js";

export const productExists = async (name = '') => {
    const existeProduct = await Products.findOne({ name });
    if (existeProduct) {
        throw new Error(`The product |${name}| has already been registered. Please choose another. :)`);
    }
}

export const notProduct = async (name = '') => {
    const notProduct = await Products.findOne({ name });
    if (!notProduct) {
        throw new Error(`The product ${name} is not valid, please enter again`);
    }
}

export const productExistsById = async (id = '') => {
    try {
        const productExistsById = await Products.findById(id);
        if (!productExistsById) {
            throw new Error(`Product not found`);
        }
        if (!productExistsById.status) {
            throw new Error(`Product not found`);
        }
    } catch (error) {
        throw error;
    }
}

export const validatePrice = async (price = 0) => {
    const priceRegex = /^\d+(\.\d{1,2})?$/;
    if (!priceRegex.test(price.toString())) {
        throw new Error(`Price must have up to two decimal places.`);
    }
}