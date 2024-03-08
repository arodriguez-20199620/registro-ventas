import User from "../users/user.model.js";
import zxcvbn from "zxcvbn";

export const emailExists = async (email = '') => {
    try {
        const emailExists = await User.findOne({ email });
        if (emailExists) {
            throw new Error(`Email "${email}" already registered. Choose another.`);
        }
    } catch (error) {
        throw error;
    }
}

export const notEmail = async (email = '') => {
    try {
        const notEmail = await User.findOne({ email });
        if (!notEmail) {
            throw new Error(`The email ${email} is not valid, please enter again`);
        }
    } catch (error) {
        throw error;
    }
}

export const existUserById = async (id = '') => {
    try {
        const existUserById = await User.findById(id);
        if (!existUserById) {
            throw new Error(`The user with the ${id} does not exist`);
        }
        if (!existUserById.status) {
            throw new Error(`Category not found`);
        }
    } catch (error) {
        throw error;
    }
};

export const validatePassword = async (password = '') => {
    const result = zxcvbn(password);

    if (result.score < 2) {
        throw new Error(`The password is not safe enough.`);
    }
    if (password.length < 6) {
        throw new Error('The password must be at least 6 characters.');
    }
};

export const validateRole = async (role = '') => {
    if (!['ADMIN', 'CLIENT'].includes(role)) {
        throw new Error('This role is not valid');

    }
}
