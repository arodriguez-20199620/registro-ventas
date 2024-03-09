import bcryptjs from 'bcryptjs';
import User from './user.model.js';
import Product from '../products/products.model.js';

export const register = async (req, res) => {
    const { email, password, firstname, lastname, role } = req.body;
    const user = new User({ email, password, firstname, lastname, role });

    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);

    await user.save();

    res.status(201).json({
        email: user.email,
        firstname: user.firstname,
        lastname: user.lastname,
        role: user.role
    });
}

export const assignRole = async (req, res) => {
    const email = req.params.email;
    try {
        const user = await User.findOne({ email: email });

        const { role } = req.body;

        await User.findByIdAndUpdate(user._id, {
            $set: {
                role: role || user.role,
            },
        });
        const userUpdate = await User.findOne({ email: email });
        res.status(201).json({
            msg: 'Role Successfully Assigned',
            userUpdate,
        })
    } catch (error) {
        console.error(error);
        res.status(500).json('Internal Server Error');
    }
}

export const deleteUserAdmin = async (req, res) => {
    const userId = req.params.userId;
    try {
        await User.findByIdAndUpdate(userId, { status: false })

        res.status(200).json({ msg: 'User deleted successfully.' });
    } catch (error) {
        console.error(error);
        res.status(500).json('Internal Server Error');
    }
}


export const deleteUserClient = async (req, res) => {
    const userId = req.user._id;
    try {
        await User.findByIdAndUpdate(userId, { status: false })

        res.status(200).json({ msg: 'User deleted successfully.' });
    } catch (error) {
        console.error(error);
        res.status(500).json('Internal Server Error');
    }
}


export const editUser = async (req, res) => {
    const userId = req.user._id;

    try {
        const { _id, password: newPassword, ...userUpdate } = req.body;
        if (newPassword) {
            const salt = bcryptjs.genSaltSync();
            userUpdate.password = bcryptjs.hashSync(newPassword, salt);
        }

        await User.findByIdAndUpdate(userId, userUpdate);

        const user = await User.findOne({ _id: userId });

        const userData = {
            password: user.password,
            firstname: user.firstname,
            lastname: user.lastname
        };

        res.status(200).json({
            msg: 'Successfully updated',
            user: userData
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Error' });
    }
}


export const addToCart = async (req, res) => {
    const userId = req.user._id;

    try {
        const user = await User.findById(userId);
        const { products } = req.body;

        if (user && products && Array.isArray(products)) {
            let totalAmount = 0;
            for (const cartItem of user.cart) {
                const product = await Product.findOne({ _id: cartItem.productId });
                if (product) {
                    totalAmount += (product.price * cartItem.quantity);
                }
            }
            for (const item of products) {
                const { productName, quantity } = item;
                const product = await Product.findOne({ name: productName });

                if (product) {
                    const existingCartItem = user.cart.find(cartItem => cartItem.productId.equals(product._id));
                    if (existingCartItem) {
                        existingCartItem.quantity += quantity || 1;
                    } else {
                        user.cart.push({ productId: product._id, quantity: quantity || 1 });
                    }

                    product.stock -= quantity || 1;
                    await product.save();

                    totalAmount += (product.price * (quantity || 1));

                }
            }
            await user.save();


            const cart = await Promise.all(user.cart.map(async (item) => {
                const product = await Product.findOne({ _id: item.productId });
                return {
                    product: product.name,
                    quantity: item.quantity
                };
            }));

            res.status(201).json({
                msg: 'Products in cart',
                cart,
                totalAmount
            });
        } else {
            res.status(400).json({ message: 'Datos de solicitud no válidos' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

