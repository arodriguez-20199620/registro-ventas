import bcryptjs from 'bcryptjs';
import User from '../users/user.model.js'
import { generarJWT } from '../helpers/generate-jwt.js';

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                msg: "Incorrect credentials, Email is incorrect",
            });
        }

        // verificar si el usuario está activo
        if (!user.status) {
            return res.status(400).json({
                msg: "The user does not exist in the database",
            });
        }

        // verificar la contraseña
        const validPassword = bcryptjs.compareSync(password, user.password);

        if (!validPassword) {
            return res.status(400).json({
                msg: "Password is incorrect",
            });
        }

        // generar el JWT
        const token = await generarJWT(user.id);


        res.status(200).json({
            msg: 'Successful authentication',
            email: user.email,
            firstname: user.firstname,
            lastname: user.lastname,
            role: user.role,
            token
        });

    } catch (e) {
        console.log(e);
        res.status(500).json({
            msg: "Contact administrator",
        });
    }
}