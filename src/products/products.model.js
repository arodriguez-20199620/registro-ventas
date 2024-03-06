import mongoose from 'mongoose';

const ProductsSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        default: 0
    },
    stock: {
        type: Number,
        default: 0
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Categories'
    },
    sales: {
        type: Number,
        default: 0
    },
    status: {
        type: Boolean,
        default: true,
    },
});

export default mongoose.model('Products', ProductsSchema);  