const RoomSchema = require("../models/Room");
const HotelSchema = require("../models/Hotel");

const createRoom = async (req, res, next) => {
    const hotelID = req.params.hotelID
    const room = new RoomSchema(req.body);
    try {
        const savedRoom = await room.save();
        await HotelSchema.findByIdAndUpdate(hotelID, {
            $push: { rooms: room._id }
        })
        res.status(200).json(savedRoom);
    } catch (error) {
        next(error);
    }
}

const updateRoom = async (req, res, next) => {
    const id = req.params.id;
    try {
        const updatedRoom = await RoomSchema.findByIdAndUpdate(
            id,
            {
                $set: req.body,
            },
            {
                new: true,
            }
        );
        res.status(200).json(updatedRoom);
    } catch (error) {
        next(error);
    }
}
const deleteRoom = async (req, res, next) => {
    const id = req.params.id;
    const hotelID=req.params.hotelID;
    try {
        await RoomSchema.findByIdAndDelete(id);
        await HotelSchema.findByIdAndUpdate(hotelID, {
            $pull: { rooms:id}
        })
        res.status(200).json("room is deleted");
    } catch (error) {
        next(error);
    }
}
const getRoom = async (req, res, next) => {
    const id = req.params.id;
    try {
        const room = await RoomSchema.findById(id);
        res.status(200).json(room);
    } catch (error) {
        next(error);
    }
}
const getRooms = async (req, res, next) => {
    try {
        const rooms = await RoomSchema.find();
        res.status(200).json(rooms);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    createRoom,
    updateRoom,
    deleteRoom,
    getRoom,
    getRooms
}