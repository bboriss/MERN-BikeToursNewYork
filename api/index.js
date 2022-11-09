require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const router = require("./router.const");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/error.controller");

const app = express();
// Middlewares
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(cookieParser());
app.use(router);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

const PORT = process.env.PORT || 8800;
const HOST = process.env.HOST || "0.0.0.0";

mongoose.connect(process.env.MONGO_URI, (error) => {
  if (error) {
    console.log(error);
    return;
  }
  console.log("CONNECTED TO DATABASE SUCCESS!");

  app.listen(PORT, HOST, () =>
    console.log(`Server running on http://localhost:${PORT}`)
  );
});
