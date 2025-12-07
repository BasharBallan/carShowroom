const express = require('express');

const authService = require('../services/authService');

const {
  addCarToWishlist,
  removeCarFromWishlist,
  getLoggedUserWishlist,
} = require('../services/carWishlistService');

const router = express.Router();


router.route('/').post(addCarToWishlist).get(getLoggedUserWishlist);

router.delete('/:carId', removeCarFromWishlist);

module.exports = router;
