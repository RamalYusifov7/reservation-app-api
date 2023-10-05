const UserSchema = require("../models/User");

const updateUser = async (req, res,next) => {
    const id = req.params.id;
    try {
        const updatedUser = await UserSchema.findByIdAndUpdate(
            id,
            {
                $set: req.body,
            },
            {
                new: true,
            }
        );
        res.status(200).json(updatedUser);
    } catch (error) {
        next(error);
    }
}
const deleteUser = async (req, res,next) => {
    const id = req.params.id;
    try {
        await UserSchema.findByIdAndDelete(id);
        res.status(200).json("user is deleted");
    } catch (error) {
        next(error);
    }
}
const getUser = async (req, res,next) => {
    const id = req.params.id;
    try {
        const user = await UserSchema.findById(id);
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
}
const getUsers = async (req, res,next) => {
    try {
        const users = await UserSchema.find();
        res.status(200).json(users);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    updateUser,
    deleteUser,
    getUser,
    getUsers
}