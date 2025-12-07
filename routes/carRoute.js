const express = require('express');

const {
  getCarValidator,
  createCarValidator,
  updateCarValidator,
  deleteCarValidator,
} = require('../utils/validators/carValidator');

const {
  getCars,
  getCar,
  createCar,
  updateCar,
  deleteCar,
  uploadCarImages,
  resizeCarImage,
} = require('../services/carService');

const authService = require('../services/authService');

const router = express.Router();

router
  .route('/')
  .get(getCars)
  .post(
    authService.protect,
    authService.allowedTo('admin'),
    uploadCarImages,       
    resizeCarImage,      
    createCarValidator,       
    createCar              
  );

router
  .route('/:id')
  .get(getCarValidator, getCar)
  .put(
    authService.protect,
    authService.allowedTo('admin'),
    uploadCarImages,
    resizeCarImage,
    updateCarValidator,
    updateCar
  )
  .delete(
    authService.protect,
    authService.allowedTo('admin'),
    deleteCarValidator,
    deleteCar
  );

module.exports = router;
