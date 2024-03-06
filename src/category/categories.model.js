import mongoose from 'mongoose';

const CategoriesSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    status: {
        type: Boolean,
        default: true,
    },
});

export default mongoose.model('Categories', CategoriesSchema);