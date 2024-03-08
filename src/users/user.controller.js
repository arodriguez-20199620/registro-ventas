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

