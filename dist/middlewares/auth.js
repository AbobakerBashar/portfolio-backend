import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";
export const checkAuth = async (req, res, next) => {
    try {
        const { token } = req.cookies;
        if (!token)
            return res.status(403).json({
                success: false,
                message: "Unauthorized!!",
            });
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded)
            return res.status(403).json({ message: "Unauthorized!" });
        const user = await Admin.findById(decoded.id).select("_id");
        if (!user)
            return res.status(403).json({ message: "Unauthorized!" });
        req.params.user_id = user._id.toString();
        next();
    }
    catch (error) {
        return res.status(403).json({
            success: false,
            message: "Unauthenticated!",
            errors: { error: error.message },
        });
    }
};
