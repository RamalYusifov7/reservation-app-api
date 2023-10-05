const { createHotel, updateHotel, deleteHotel, getHotel, getHotels } = require("../controllers/hotelController");
const { isAdmin } = require("../utils/verifyToken");
const router = require("express").Router();


// create new hotel
router.post("/", createHotel);

// update an hotel
router.put("/:id",isAdmin, updateHotel);

// delete an hotel
router.delete("/:id",isAdmin, deleteHotel);

//get an hotel
router.get("/:id", getHotel);

//get all hotels
router.get("/", getHotels);

module.exports = router;
