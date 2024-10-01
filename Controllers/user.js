import User from "../Models/user.js"
import jwt from "jsonwebtoken"
import { resfun } from "../Utils/resfunction.js";
import bcrypt from "bcrypt";
import errorhandler from "../middlewares/Error.js";

export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        let user = await User.findOne({ email });
        if (user) return next(new errorhandler("User already exists", 401));

        const hashed_password = await bcrypt.hash(password, 10);


        user = await User.create({
            name,
            email,
            password: hashed_password
        })
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
        resfun(user, res, "User Registered Successfully", 201, token);
    } catch (error) {
        next(error);
    }
}
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email }).select("+password");

        if (!user) return next(new errorhandler("Incorrect Email or Password", 401));

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return next(new errorhandler("Invalid emai or password", 401));

        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
        resfun(user, res, `Welcome back ${user.name}`, 200, token);
    } catch (error) {
        next(error);
    }

}
export const logoutUser = (req, res) => {
    try {
        res
            .status(200)
            .cookie("token", "", {
                expires: new Date(Date.now()),
                sameSite: process.env.Node_ENV === "Development" ? "lax" : "none",
                secure: process.env.Node_ENV === "Development" ? false : true
            })
            .json({
                success: true,
                message: "Logout Successfully"
            })
    } catch (error) {
        next(error);
    }
}
export const getmyprofile = (req, res) => {
    try {
        res.status(200).json({
            success: true,
            user: req.user
        })
    } catch (error) {
        next(error);
    }
}    