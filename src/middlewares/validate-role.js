export const validateUserRole = (...roles) => {
    return (req, res, next) => {
        if (!req.user) {
            return res
                .status(500)
                .json({
                    msg: "You want to verify a role without validating the token first",
                });
        }

        if (!roles.includes(req.user.role)) {
            return res
                .status(401)
                .json({
                    msg: `Restricted access`,
                });
        }
        next();
    };
};