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


export const editProducts = async (req, res) => {
    const productId = req.params.productId;
    try {
        const products = await Products.findById(productId);

        const { name, price, stock, category } = req.body;

        const categories = await Categories.findOne({ name: category });
        // Actualizar solo los detalles específicos del producto
        await Products.findByIdAndUpdate(productId, {
            $set: {
                name: name || products.name,
                price: price || products.price,
                stock: stock || products.stock,
                categoryId: categories._id || products.categoryId,
            },
        });

        // Obtener el producto actualizado
        const product = await Products.findById(productId);

        res.status(201).json({
            msg: 'Update successful',
            name: product.name,
            price: product.price,
            stock: product.stock,
            category: categories.name
        })
    } catch (error) {
        console.error(error);
        res.status(500).json('Internal Server Error');
    }
}
export const viewCatalog = async (req, res) => {
    try {
        const products = await Products.find({ status: true });

        const productsList = await Promise.all(products.map(async (product) => {
            const category = await Categories.findOne({ _id: product.categoryId });
            return {
                id: product._id,
                name: product.name,
                price: product.price,
                stock: product.stock,
                sales: product.sales,
                category: category ? category.name : 'N/A',
            };
        }));

        res.status(200).json(productsList);
    } catch (error) {
        console.error('Error getting catalog:', error);
        res.status(500).json({ message: 'Error getting catalog. Please try again.' });
    }
}

export const searchProduct = async (req, res) => {
    const productId = req.params.productId;
    const product = await Products.findOne({ _id: productId });
    const category = await Categories.findOne({ _id: product.categoryId });
    res.status(200).json({
        name: product.name,
        price: product.price,
        stock: product.stock,
        category: category.name
    });
}
