const router = require("express").Router();

const toursRoute = require("./routes/tours.route");
const usersRoute = require("./routes/users.route");

// TOURS ROUTE
router.use("/tours", toursRoute);

// AUTHENTICATION AND USERS ROUTE
router.use("/users", usersRoute);

module.exports = router;
