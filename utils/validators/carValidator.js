const { check, body } = require("express-validator");
const validatorMiddleware = require("../../middlewares/validatorMiddleware");

exports.getCarValidator = [
  check("id").isMongoId().withMessage("Invalid car id format"),
  validatorMiddleware,
];

exports.createCarValidator = [
  check("name").notEmpty().withMessage("Car name required"),
  check("brand").notEmpty().withMessage("Car brand required"),
  check("model").notEmpty().withMessage("Car model required"),
  check("year").isInt({ min: 1980, max: new Date().getFullYear() }).withMessage("Invalid car year"),
  check("price").isNumeric().withMessage("Car price must be a number"),
  check("mileage").isNumeric().withMessage("Car mileage must be a number"),
  check("fuelType").isIn(["بنزين", "مازوت"]).withMessage("Invalid fuel type"),
  check("transmission").isIn(["أوتوماتيك", "يدوي"]).withMessage("Invalid transmission type"),
  check("contactNumber").matches(/^\+?[0-9]{7,15}$/).withMessage("Invalid contact number"),
  validatorMiddleware,
];

exports.updateCarValidator = [
  check("id").isMongoId().withMessage("Invalid car id format"),
  body("year").optional().isInt({ min: 1980, max: new Date().getFullYear() }),
  body("price").optional().isNumeric(),
  body("mileage").optional().isNumeric(),
  validatorMiddleware,
];

exports.deleteCarValidator = [
  check("id").isMongoId().withMessage("Invalid car id format"),
  validatorMiddleware,
];
