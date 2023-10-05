const { createRoom, updateRoom, deleteRoom, getRoom, getRooms } = require("../controllers/roomController");
const { isAdmin } = require("../utils/verifyToken");
const router = require("express").Router();


// create new room
router.post("/:hotelID",isAdmin, createRoom);

// update an room
router.put("/:id",isAdmin, updateRoom);

// delete an room
router.delete("/:id/:hotelID",isAdmin, deleteRoom);

//get an room
router.get("/:id", getRoom);

//get all rooms
router.get("/", getRooms);

module.exports = router;
