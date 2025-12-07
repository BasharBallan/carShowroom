const express = require('express');

const authService = require('../services/authService');

const {
  addCarToWishlist,
  removeCarFromWishlist,
  getLoggedUserWishlist,
} = require('../services/carWishlistService');

const router = express.Router();


router.route('/').post( authService.allowedTo('user'),addCarToWishlist).get(authService.allowedTo('user'), getLoggedUserWishlist);

router.delete('/:carId', authService.allowedTo('user'), removeCarFromWishlist);

module.exports = router;
