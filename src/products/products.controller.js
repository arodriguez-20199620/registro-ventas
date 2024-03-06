import Products from "./products.model.js";
import Categories from "../categories/categories.model.js";

export const createProducts = async (req, res) => {
    const { name, stock, price, category, } = req.body;

    const categories = await Categories.findOne({ name: category });
    const products = new Products({ name, price, stock, categoryId: categories.id });

    await products.save();

    res.status(201).json({
        name: products.name,
        price: products.price,
        stock: products.stock,
        category: categories.name
    })
}

export const viewCatalog = async (req, res) => {
    try {
        const products = await Products.find({ status: true }); // Filtrar categorías activas

        const productsList = products.map(product => ({
            id: product._id,
            name: product.name,
            price: product.price,
            stock: product.stock,
            sales: product.sales,
        }));

        res.status(200).json(productsList);
    } catch (error) {
        console.error('Error al obtener las categorías:', error);
        res.status(500).json({ mensaje: 'Error al obtener las categorías. Por favor, inténtalo de nuevo.' });
    }
}