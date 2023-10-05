const HotelSchema = require("../models/Hotel");

const createHotel = async (req, res, next) => {
    const hotel = new HotelSchema(req.body);
    try {
        const savedHotel = await hotel.save();
        res.status(200).json(savedHotel);
    } catch (error) {
        next(error);
    }
}

const updateHotel = async (req, res, next) => {
    const id = req.params.id;
    try {
        const updatedHotel = await HotelSchema.findByIdAndUpdate(
            id,
            {
                $set: req.body,
            },
            {
                new: true,
            }
        );
        res.status(200).json(updatedHotel);
    } catch (error) {
        next(error);
    }
}
const deleteHotel = async (req, res, next) => {
    const id = req.params.id;
    try {
        await HotelSchema.findByIdAndDelete(id);
        res.status(200).json("hotel is deleted");
    } catch (error) {
        next(error);
    }
}
const getHotel = async (req, res, next) => {
    const id = req.params.id;
    try {
        const hotel = await HotelSchema.findById(id);
        res.status(200).json(hotel);
    } catch (error) {
        next(error);
    }
}

const getHotels = async (req, res, next) => {
    try {
        const { min, max, others } = req.query;
        const query = HotelSchema.find();

        if (min) {
            query.where('cheapestPrice').gt(parseInt(min));
        }
        if (max) {
            query.where('cheapestPrice').lt(parseInt(max));
        }
        if (others) {
            query.find(others);
        }
        const hotels = await query.exec();
        res.status(200).json(hotels);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    createHotel,
    updateHotel,
    deleteHotel,
    getHotel,
    getHotels
}