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