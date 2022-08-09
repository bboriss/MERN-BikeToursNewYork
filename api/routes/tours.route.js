const router = require("express").Router();

const {
  getAllTours,
  getTourById,
  addNewTour,
  updateTour,
  deleteTourById,
  getByStartLocation,
} = require("../controllers/tours.controller.js");

const { protect, restrictTo } = require("../controllers/auth.controller");

router.route("/").get(getAllTours).post(restrictTo("admin"), addNewTour);
router.route("/searchByStartLocation").get(getByStartLocation);

router.use(protect);
router
  .route("/:id")
  .get(getTourById)
  .patch(restrictTo("admin"), updateTour)
  .delete(restrictTo("admin"), deleteTourById);

module.exports = router;
