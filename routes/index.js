const categoryRoute = require("./categoryRoute");
const brandRoute = require("./brandRoute");
const userRoute = require("./userRoute");
const authRoute = require("./authRoute");
const reviewRoute = require("./reviewRoute");
const wishlistRoute = require("./wishlistRoute");
const carModel = require("./carRoute");


const mountRoutes = (app) => {
  app.use("/api/v1/categories", categoryRoute);
  app.use("/api/v1/brands", brandRoute);
  app.use("/api/v1/users", userRoute);
  app.use("/api/v1/auth", authRoute);
  app.use("/api/v1/reviews", reviewRoute);
  app.use("/api/v1/wishlist", wishlistRoute);
  app.use("/api/v1/cars", carModel);

};

module.exports = mountRoutes;
