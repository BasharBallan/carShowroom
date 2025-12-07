const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

// @desc    Add car to wishlist
// @route   POST /api/v1/car-wishlist
// @access  Protected/User
exports.addCarToWishlist = asyncHandler(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(
    req.user._id,
    {
      $addToSet: { wishlist: req.body.carId }, 
    },
    { new: true }
  );

  res.status(200).json({
    status: 'success',
    message: 'Car added successfully to your wishlist.',
    data: user.wishlist,
  });
});

// @desc    Remove car from wishlist
// @route   DELETE /api/v1/car-wishlist/:carId
// @access  Protected/User
exports.removeCarFromWishlist = asyncHandler(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(
    req.user._id,
    {
      $pull: { wishlist: req.params.carId },
    },
    { new: true }
  );

  res.status(200).json({
    status: 'success',
    message: 'Car removed successfully from your wishlist.',
    data: user.wishlist,
  });
});

// @desc    Get logged user car wishlist
// @route   GET /api/v1/car-wishlist
// @access  Protected/User
exports.getLoggedUserWishlist = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user._id).populate('wishlist');

  res.status(200).json({
    status: 'success',
    results: user.wishlist.length,
    data: user.wishlist,
  });
});
