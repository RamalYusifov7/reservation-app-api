const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")

const User = require("../models/User");
const CustomError = require("../utils/error");

const register = async function (req, res, next) {
    const { username, email, password } = req.body;

    try {
        const existingUsername = await User.findOne({ username: username });
        const existingEamil = await User.findOne({ email: email });

        if (existingEamil) return next(new CustomError("Email is already in use"));
        if (existingUsername)
            return res.json(new CustomError("Usernmae is already taken"));

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const registeredUser = await User.create({
            username,
            email,
            password: hashedPassword,
        });
        res.status(200).json({
            username: registeredUser.username,
            email: registeredUser.email,
        });
    } catch (error) {
        next(error);
    }
}

const login = async function (req, res, next) {
    try {
        const user = await User.findOne({ username: req.body.username });
        if (!user) return next(new CustomError("username not found"));

        const isPasswordCorrect = await bcrypt.compare(
            req.body.password,
            user.password
        );

        if (!isPasswordCorrect) {
            return next(new CustomError("Password is incorrect"));
        }
        const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET)
        const { password, isAdmin, ...others } = user._doc;

        res.status(200).send({ ...others, token })

    } catch (error) {
        next(error);
    }
}

module.exports = {
    login,
    register
}