import bcryptjs from 'bcryptjs';
import User from './user.model.js';

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


