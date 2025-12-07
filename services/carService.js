const sharp = require('sharp');
const { v4: uuidv4 } = require('uuid');
const asyncHandler = require('express-async-handler');

const factory = require('./handlersFactory');
const { uploadSingleImage } = require('../middlewares/uploadImageMiddleware');
const Car = require('../models/carModel');

const { uploadMixOfImages } = require('../middlewares/uploadImageMiddleware');

exports.uploadCarImages = uploadMixOfImages([
  { name: 'images', maxCount: 5 }
]);


// Image processing
exports.resizeCarImage = asyncHandler(async (req, res, next) => {
  const filename = `car-${uuidv4()}-${Date.now()}.jpeg`;
  if (req.file) {
    await sharp(req.file.buffer)
      .resize(600, 600)
      .toFormat('jpeg')
      .jpeg({ quality: 95 })
      .toFile(`uploads/cars/${filename}`);

    // Save image into our db
    req.body.images = [filename];
  }

  next();
});

// @desc    Get list of cars
// @route   GET /api/v1/cars
// @access  Public
exports.getCars = factory.getAll(Car);

// @desc    Get specific car by id
// @route   GET /api/v1/cars/:id
// @access  Public
exports.getCar = factory.getOne(Car);

// @desc    Create car
// @route   POST  /api/v1/cars
// @access  Private/Admin-Manager
exports.createCar = factory.createOne(Car);

// @desc    Update specific car
// @route   PUT /api/v1/cars/:id
// @access  Private/Admin-Manager
exports.updateCar = factory.updateOne(Car);

// @desc    Delete specific car
// @route   DELETE /api/v1/cars/:id
// @access  Private/Admin
exports.deleteCar = factory.deleteOne(Car);
