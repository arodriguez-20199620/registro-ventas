import Categories from "../category/categories.model.js";

export const categoryExists = async (name = '') => {
    try {
        const emailExicategoryExistssts = await Categories.findOne({ name });
        if (emailExicategoryExistssts) {
            throw new Error(`Category |${name}| already registered. Choose another.`);
        }
    } catch (error) {
        throw error;
    }
}