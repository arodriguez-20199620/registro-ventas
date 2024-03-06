import Products from "../products/products.model.js";

export const productExists = async (name = '') => {
    const existeProduct = await Products.findOne({ name });
    if (existeProduct) {
        throw new Error(`The product |${name}| has already been registered. Please choose another. :)`);
    }
}

export const validatePrice = async (price = 0) => {
    const priceRegex = /^\d+(\.\d{1,2})?$/;
    if (!priceRegex.test(price.toString())) {
        throw new Error(`Price must have up to two decimal places.`);
    }
}