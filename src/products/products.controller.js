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

        await Products.findByIdAndUpdate(productId, {
            $set: {
                name: name || products.name,
                price: price || products.price,
                stock: stock || products.stock,
                categoryId: categories._id || products.categoryId,
            },
        });

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

export const deleteProducts = async (req, res) => {
    const productId = req.params.productId;
    try {
        await Products.findByIdAndUpdate(productId, { status: false });

        res.status(200).json({ msg: 'Product deleted successfully.' });
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

        res.status(200).json({ products: productsList });
    } catch (error) {
        console.error(error);
        res.status(500).json('Internal Server Error');
    }
}

export const availableProducts = async (req, res) => {
    try {
        const products = await Products.find({ status: true, stock: 0 });

        if (products.length > 0) {
            const productsList = products.map(product => (
                {
                    id: product._id,
                    name: product.name,
                    stock: product.stock,
                }));
            res.status(200).json({ msg: "Products out of stock", products: productsList });
        } else {
            res.status(200).json({ msg: "There are no products out of stock, Enjoy all our products :)" });
        }

    } catch (error) {
        console.error(error);
        res.status(500).json('Internal Server Error');
    }
}

export const filterCategories = async (req, res) => {
    const categoryId = req.params.categoryId

    try {
        const products = await Products.find({ status: true, categoryId: categoryId });

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

        res.status(200).json({ products: productsList });
    } catch (error) {
        console.error(error);
        res.status(500).json('Internal Server Error');
    }
};

export const moreSales = async (req, res) => {
    try {
        const products = await Products.find({ status: true }).sort({ sales: -1 }).exec();


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

        res.status(200).json({ products: productsList });
    } catch (error) {
        console.error(error);
        res.status(500).json('Internal Server Error');
    }
}

export const searchProduct = async (req, res) => {
    const productName = req.params.productName;

    try {
        const products = await Products.find({ name: productName });

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
        res.status(200).json({ products: productsList });
    } catch (error) {
        console.error(error);
        res.status(500).json('Internal Server Error');
    }
}
