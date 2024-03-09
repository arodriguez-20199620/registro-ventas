import mongoose from 'mongoose';


const InvoiceSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    products: [{
        productName: String,
        quantity: Number,
        price: Number,
    }],
    total: Number,
    status: {
        type: Boolean,
        default: true,
    },
    date: { type: Date, default: Date.now },
});

export default mongoose.model('Invoice', InvoiceSchema);  