const mongoose = require('mongoose');

const carSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'car name required'],
      trim: true,
    },
    brand: {
        type: mongoose.Schema.ObjectId,
        ref: 'Brand',
        required: [true, 'brand required'],
    },
    category: {
      type: mongoose.Schema.ObjectId,
      ref: 'Category',
      required: [true, 'category required'],
    },
    model: {
      type: String,
      required: [true, 'car model required'],
    },
    year: {
      type: Number,
      required: [true, 'car year required'],
    },
    price: {
      type: Number,
      required: [true, 'price required'],
    },
    mileage: {
      type: Number,
      required: [true, 'mileage required'],
    },
    fuelType: {
      type: String,
      enum: ['diesel', 'fuel'],
      required: true,
    },
    transmission: {
      type: String,
      enum: ['automatic', 'manual'],
      required: true,
    },
    color: {
      type: String,
      enum: ['red', 'blue', 'black', 'white', 'silver', 'gray','green','orange','brown', 'other'],
      default: 'No color selected',
    },
    status: {
      type: String,
      enum: ['available', 'sold', 'reserved'],
      default: 'available',
    },
    description: {
      type: String,
      maxlength: 2000,
    },
    images: [String],
    contactNumber: {
      type: String,
      required: [true, 'contact number required'],
      match: [/^\+?[0-9]{7,15}$/, 'invalid contact number'],
    },
  },
  { timestamps: true }
);

const setImageURLs = (doc) => {
  if (doc.images && Array.isArray(doc.images)) {
    doc.images = doc.images.map(img => `${process.env.BASE_URL}/cars/${img}`);
  }
};

carSchema.post('init', setImageURLs);
carSchema.post('save', setImageURLs);

module.exports = mongoose.model('Car', carSchema);
