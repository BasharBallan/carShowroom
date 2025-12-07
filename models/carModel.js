const mongoose = require('mongoose');

const carSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'اسم السيارة مطلوب'],
      trim: true,
    },
    brand: {
      type: String,
      required: [true, 'الماركة مطلوبة'],
      enum: ['Toyota', 'BMW', 'Mercedes', 'Hyundai', 'Kia', 'Ford', 'Other'],
    },
    model: {
      type: String,
      required: [true, 'موديل السيارة مطلوب'],
    },
    year: {
      type: Number,
      required: [true, 'سنة الصنع مطلوبة'],
    },
    price: {
      type: Number,
      required: [true, 'السعر مطلوب'],
    },
    mileage: {
      type: Number,
      required: [true, 'عدد الكيلومترات مطلوب'],
    },
    fuelType: {
      type: String,
      enum: ['بنزين', 'مازوت'],
      required: true,
    },
    transmission: {
      type: String,
      enum: ['أوتوماتيك', 'يدوي'],
      required: true,
    },
    color: {
      type: String,
      default: 'غير محدد',
    },
    status: {
      type: String,
      enum: ['متاح', 'مباع', 'محجوز'],
      default: 'متاح',
    },
    description: {
      type: String,
      maxlength: 2000,
    },
    images: [String],
    contactNumber: {
      type: String,
      required: [true, 'رقم التواصل مطلوب'],
      match: [/^\+?[0-9]{7,15}$/, 'رقم التواصل غير صالح'],
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
