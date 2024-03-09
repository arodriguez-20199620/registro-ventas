import User from "../users/user.model.js";
import zxcvbn from "zxcvbn";
import Products from "../products/products.model.js";

export const emailExists = async (email = '') => {
    try {
        const emailExists = await User.findOne({ email });
        if (emailExists) {
            throw new Error(`Email "${email}" already registered. Choose another.`);
        }
    } catch (error) {
        throw error;
    }
}

export const notEmail = async (email = '') => {
    try {
        const notEmail = await User.findOne({ email });
        if (!notEmail) {
            throw new Error(`The email ${email} is not valid, please enter again`);
        }
    } catch (error) {
        throw error;
    }
}

export const existUserById = async (id = '') => {
    try {
        const existUserById = await User.findById(id);
        if (!existUserById) {
            throw new Error(`The user with the ${id} does not exist`);
        }
        if (!existUserById.status) {
            throw new Error(`Category not found`);
        }
    } catch (error) {
        throw error;
    }
};

export const validatePassword = async (password = '') => {
    const result = zxcvbn(password);

    if (result.score < 2) {
        throw new Error(`The password is not safe enough.`);
    }
    if (password.length < 6) {
        throw new Error('The password must be at least 6 characters.');
    }
};

export const validateRole = async (role = '') => {
    if (!['ADMIN', 'CLIENT'].includes(role)) {
        throw new Error('This role is not valid');

    }
}

export const productExists = async (products = []) => {
    const productNames = products.map(item => item.productName);

    for (let i = 0; i < products.length; i++) {
        const productModel = await Products.findOne({ name: productNames[i] });

        if (!productModel) {
            throw new Error(`El producto ${productNames[i]} no existe en la base de datos`);
        }

        if (!productModel.status) {
            throw new Error(`El producto ${productNames[i]} no está disponible actualmente`);
        }
    }
};


export const validateStock = async (products = []) => {
    try {
        if (products && Array.isArray(products)) {
            for (const item of products) {
                const { productName, quantity } = item;
                const product = await Products.findOne({ name: productName });

                if (product && product.stock < (quantity || 1)) {
                    throw new Error(`Not enough stock available for ${productName}. Current Stock: ${product.stock}`);
                }
            }
        } else {
            throw new Error('Invalid request data');
        }
    } catch (error) {
        throw error;
    }
};