const router = require("express").Router();
const {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUserById,
} = require("../controllers/users.controller");

const {
  register,
  login,
  logout,
  protect,
  restrictTo,
} = require("../controllers/auth.controller");

router.route("/auth/register").post(register);
router.route("/auth/login").post(login);
router.route("/auth/logout").post(logout);

router.use(protect);

router.use(restrictTo("admin"));

router.route("/").get(getAllUsers);
router.route("/:id").get(getUserById).patch(updateUser).delete(deleteUserById);

module.exports = router;
