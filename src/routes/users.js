const { updateUser, deleteUser, getUser, getUsers } = require('../controllers/usersController');
const { isAuthorized, isAdmin } = require('../utils/verifyToken');

const router = require('express').Router();



// update an user
router.put("/:id", isAuthorized, updateUser);

// delete an user
router.delete("/:id", isAuthorized, deleteUser);

//get an user
router.get("/:id", isAuthorized, getUser);

//get all users
router.get("/", isAdmin, getUsers);


module.exports = router