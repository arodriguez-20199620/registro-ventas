import mongoose from 'mongoose';

const UserSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['ADMIN', 'CLIENT'],
        required: true,
        default: 'CLIENT'
    },
    status: {
        type: Boolean,
        default: true,
    },
});

export default mongoose.model('User', UserSchema);