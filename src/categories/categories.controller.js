import Categories from "./categories.model.js";
import Products from "../products/products.model.js";

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

export const deleteCategories = async (req, res) => {
    const categoryId = req.params.categoryId;

    try {
        const products = await Products.find({ categoryId: categoryId });

        const defaultCategory = await Categories.findOne({ name: 'Sin Clasificar' });

        await Promise.all(products.map(async (product) => {
            await Products.findByIdAndUpdate(product._id, { $set: { categoryId: defaultCategory._id } });
        }));

        // Eliminar la categoría
        await Categories.findByIdAndUpdate(categoryId, { status: false });

        return res.status(200).json({ msg: 'Categoría eliminada exitosamente.' });
    } catch (error) {
        console.error('Error al eliminar la categoría:', error);
        return res.status(500).json({ mensaje: 'Error al eliminar la categoría. Por favor, inténtalo de nuevo.' });
    }
}

export const getCategories = async (req, res) => {
    try {
        const categories = await Categories.find({ status: true }); // Filtrar categorías activas

        const categoryList = categories.map(category => ({
            id: category._id,
            name: category.name
        }));

        res.status(200).json(categoryList);
    } catch (error) {
        console.error('Error al obtener las categorías:', error);
        res.status(500).json({ mensaje: 'Error al obtener las categorías. Por favor, inténtalo de nuevo.' });
    }
}

