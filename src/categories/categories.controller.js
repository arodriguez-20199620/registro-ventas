import Categories from "./categories.model.js";

export const createCategories = async (req, res) => {
    const { name } = req.body;
    const categories = new Categories({ name });

    await categories.save();

    res.status(201).json({
        id: categories._id,
        categories: categories.name
    })
}

export const editCategories = async (req, res) => {
    const categoryId = req.params.categoryId;
    const { _id, ...rest } = req.body;

    try {
        await Categories.findByIdAndUpdate(categoryId, rest)

        const categories = await Categories.findOne({ _id: categoryId })

        res.status(200).json({
            id: categories._id,
            categories: categories.name
        });
    } catch (error) {
        console.error(error);
        res.status(500).json('Internal Server Error');
    }
}