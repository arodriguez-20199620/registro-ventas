import User from "../users/user.model.js";
import Product from "../products/products.model.js";
import Invoice from "../invoices/invoices.model.js";


export const confirmPayment = async (req, res) => {
    const userId = req.user._id
    try {
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        const invoiceProducts = [];
        let total = 0;

        for (const cartItem of user.cart) {
            const product = await Product.findById(cartItem.productId);

            if (product) {
                invoiceProducts.push({
                    productName: product.name,
                    quantity: cartItem.quantity,
                    price: product.price,
                });

                total += product.price * cartItem.quantity;

                product.sales += 1;
                await product.save();
            }
        }

        const newInvoice = new Invoice({
            userId: user._id,
            products: invoiceProducts,
            total,
        });

        await newInvoice.save();

        user.cart = [];
        await user.save();

        res.status(200).json({ message: 'Compra confirmada y factura creada', invoice: newInvoice });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const shoppingHistory = async (req, res) => {
    const userId = req.user._id;
    try {
        const userInvoices = await Invoice.find({ userId: userId });



        const formattedInvoices = await Promise.all(userInvoices.map(async (invoice) => {
            const user = await User.findOne({ _id: invoice.userId });
            return {
                user: user ? user.email : 'N/A',
                products: invoice.products.map(product => ({
                    productName: product.productName,
                    quantity: product.quantity,
                    price: product.price,
                })),
                total: invoice.total,
                date: invoice.date,
            };
        }));

        res.status(200).json(formattedInvoices);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}