import Categories from "../categories/categories.model.js";

export const categoryExists = async (name = '') => {
    try {
        const categoryExists = await Categories.findOne({ name });
        if (categoryExists) {
            throw new Error(`Category |${name}| already registered. Choose another.`);
        }
    } catch (error) {
        throw error;
    }
}

export const categoryExistsById = async (id = '') => {
    try {
        const categoryExistsById = await Categories.findById(id);
        if (!categoryExistsById) {
            throw new Error(`Category not found`);
        }
        if (!categoryExistsById.status) {
            throw new Error(`Category not found`);
        }
    } catch (error) {
        throw error;
    }
}


export const notCategory = async (category = '') => {
    try {
        const notCategory = await Categories.findOne({ name: category });
        if (!notCategory) {
            throw new Error(`The category ${category} is not valid, please enter again`);
        }
    } catch (error) {
        throw error;
    }
}