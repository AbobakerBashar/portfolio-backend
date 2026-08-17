import Admin from "../models/Admin.js";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
const handleError = (err) => {
    const errors = {};
    if (err instanceof mongoose.Error.ValidationError) {
        Object.keys(err.errors).forEach((key) => {
            errors[key] = err.errors[key].message;
        });
    }
    if (typeof err === "object" &&
        err !== null &&
        "code" in err &&
        err.code === 11000) {
        errors.email = "Email is already registered";
    }
    if (err instanceof Error) {
        if (err.message === "Incorrect email") {
            errors.email = "Incorrect email, Please enter valid credentials";
        }
        if (err.message === "Incorrect password") {
            errors.password = "Incorrect password, Please enter valid credentials";
        }
    }
    return errors;
};
// // Handle Create Token
const getToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "3d",
    });
};
export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = await Admin.create({
            name,
            email,
            password,
        });
        if (!user)
            return res.status(400).json({
                success: false,
                message: "Faild to create an account",
            });
        const token = getToken(user._id.toString());
        res.status(200).json({
            token,
            user: {
                name: user.name,
                id: user._id.toString(),
                email: user.email,
            },
            message: "Acount created successfully!",
            success: true,
        });
    }
    catch (error) {
        const errors = handleError(error);
        if (Object.entries(errors).length)
            return res.status(400).json({
                success: false,
                message: "Faild to create an account",
                errors,
            });
        else
            return res.status(500).json({
                success: false,
                message: "Faild to create an account",
                errors: {
                    error: error.message,
                },
            });
    }
};
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await Admin.login(email, password);
        if (!user)
            return res.status(404).json({
                message: "User not found",
                success: false,
            });
        const token = getToken(user._id.toString());
        res.status(201).json({
            token,
            user: {
                name: user.name,
                email: user.email,
                id: user._id.toString(),
            },
            message: "User not found",
            success: true,
        });
    }
    catch (error) {
        const errors = handleError(error);
        if (Object.entries(errors).length)
            return res.status(400).json({
                success: false,
                message: "Faild to login",
                errors,
            });
        else
            res.status(500).json({
                success: false,
                message: "Faild to login",
                errors: {
                    error: error.message,
                },
            });
    }
};
export const getAdmin = async (req, res) => {
    try {
        const user = await Admin.findById(req.params?.user_id);
        if (!user)
            return res.status(403).json({ success: false, message: "Unauthorized!" });
        res.status(200).json({
            success: true,
            user: {
                id: user._id.toString(),
                name: user.name,
                email: user.email,
            },
        });
    }
    catch (error) {
        return res.status(403).json({
            success: false,
            message: "Unauthorized!",
            errors: {
                error: error.message,
            },
        });
    }
};
