import Categories from "./categories.model.js";

export const createCategories = async (req, res) => {
    const { name } = req.body;
    const categories = new Categories({ name });

    await categories.save();

    res.status(201).json({
        categories: categories.name
    })
} 