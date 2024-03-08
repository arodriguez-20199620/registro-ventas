import User from '../users/user.model.js';
import jwt from 'jsonwebtoken';

export const validateToken = async (req, res, next) => {

    try {
        const token = req.header("x-token");

        if (!token) {
            return res.status(401).json({
                msg: "No hay token en la petición",
            });
        }
        //verificación de token
        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        //leer el usuario que corresponde al uid
        const user = await User.findById(uid);
        //verificar que el usuario exista.
        if (!user) {
            return res.status(401).json({
                msg: "Usuario no existe en la base de datos",
            });
        }
        //verificar si el uid está habilidato.
        if (!user.status) {
            return res.status(401).json({
                msg: "Token no válido - usuario con estado:false",
            });
        }

        req.user = user;

        next();
    } catch (e) {
        res.status(401).json({
            msg: "Token no válido",
        });
    }
};
