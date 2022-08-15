const Tour = require("../models/tour.js");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/asyncWrapper");

// GET ALL TOURS
getAllTours = catchAsync(async (req, res) => {
  // build query
  // filter page, sort and limit
  const queryObj = { ...req.query };

  const exclude = ["page", "sort", "limit", "fields"];
  exclude.forEach((el) => delete queryObj[el]);

  // advanced filtering
  let queryStr = JSON.stringify(queryObj);
  queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

  let query = Tour.find(JSON.parse(queryStr));

  // sorting
  if (req.query.sort) {
    const sortBy = req.query.sort.split(",").join(" ");
    query = query.sort(sortBy);
  }
  // else {
  //   query = query.sort("tripduration");
  // }

  //  field limiting
  if (req.query.fields) {
    const fields = req.query.fields.split(",").join(" ");
    query = query.select(fields);
  } else {
    // FIND A SOLUTION FOR FIELDS WITH WHITESPACES!!!
    query = query.select("-__v -bikeid");
  }

  // totalNumOfResults
  const totalNumFound = await Tour.aggregate([
    {
      $count: "totalNumFound",
    },
  ]);

  // pagination
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 8;
  const skip = (page - 1) * limit;

  query = query.skip(skip).limit(limit);

  // EXECUTE QUERY
  const tours = await query;
  // console.log(tours);

  res.status(201).json({
    status: "success",
    totalNum: totalNumFound[0].totalNumFound,
    results: tours.length,
    data: {
      tours,
    },
  });
});

// SORT BY DURATION
sortByDuration = catchAsync(async (req, res) => {
  const queryObj = { ...req.query };

  const exclude = ["page", "sort", "limit"];
  exclude.forEach((el) => delete queryObj[el]);

  // advanced filtering
  let queryStr = JSON.stringify(queryObj);
  queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
  let query = Tour.find(JSON.parse(queryStr));
  // sorting
  const sign = req.query.sort;
  query = query.sort(`${sign}tripduration`);
  // totalNumOfResults
  const totalNumFound = await Tour.aggregate([
    {
      $count: "totalNumFound",
    },
  ]);

  // pagination
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 8;
  const skip = (page - 1) * limit;

  query = query.skip(skip).limit(limit);
  const tours = await query;
  console.log(tours);
  res.status(201).json({
    status: "success",
    totalNum: totalNumFound[0].totalNumFound,
    results: tours.length,
    data: {
      tours,
    },
  });
});

// SEARCH BY START LOCATION NAME
searchByStartLocation = catchAsync(async (req, res) => {
  const searchParam = req.query["start station name"];

  // console.log(sort);
  // pagination
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 8;
  const skip = (page - 1) * limit;

  const tours = await Tour.aggregate([
    {
      $search: {
        index: "searchName",
        text: {
          query: searchParam,
          path: "start station name",
        },
      },
    },
    { $skip: skip },
    { $limit: limit },
  ]);

  const foundToursNumber = await Tour.aggregate([
    {
      $search: {
        index: "searchName",
        text: {
          query: searchParam,
          path: "start station name",
        },
      },
    },
  ]);

  res.status(201).json({
    status: "success",
    results: tours.length,
    totalNum: foundToursNumber.length,
    data: {
      data: tours,
    },
  });
});

// ADD NEW TOUR
addNewTour = catchAsync(async (req, res) => {
  const newTour = await Tour.create(req.body);

  res.status(201).json({
    status: "success",
    data: {
      tour: newTour,
    },
  });
});

// GET TOUR BY ID

// Problems with error handling when use method find by Id, NOT RETURNING NULL because of 24 characters
getTourById = catchAsync(async (req, res, next) => {
  const tour = await Tour.findById(req.params.id);
  // const allTours = await Tour.find({});
  // const id = req.params["id"];
  // const tour = allTours.filter((trip) => trip._id == id);
  // console.log("filtered array:", tour);
  if (!tour) {
    return next(new AppError("No tour found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      tour,
    },
  });
});

// UPDATE TOUR
updateTour = catchAsync(async (req, res, next) => {
  const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  if (!tour) {
    return next(new AppError("No tour found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      tour,
    },
  });
});

// DELETE TOUR
deleteTourById = catchAsync(async (req, res) => {
  const tour = await Tour.findByIdAndRemove(req.params.id);

  if (!tour) {
    return next(new AppError("No tour found with that ID", 404));
  }

  res.status(204).json({
    status: "success",
    data: null,
  });
});

module.exports = {
  getAllTours,
  getTourById,
  addNewTour,
  updateTour,
  deleteTourById,
  searchByStartLocation,
  sortByDuration,
};
