const mongoose = require('mongoose');

const CarSchema = new mongoose.Schema({
  name: { type: String, required: true },
  model: { type: String, required: true },
  year: { type: Number, required: true },
  price: { type: Number, required: true },
  km: { type: Number, required: true },
  fuel: { type: String, enum: ['Petrol', 'Diesel', 'CNG', 'Electric'], required: true },
  transmission: { type: String, enum: ['Manual', 'Automatic'], required: true },
  color: { type: String, required: true },
  owner: { type: String, enum: ['1st Owner', '2nd Owner', '3rd Owner', '4th+ Owner'], required: true },
  tireCondition: { type: Number, min: 10, max: 100, required: true }, // percentage like 70, 80, 90
  financeAvailable: { type: Boolean, default: false },
  description: { type: String },
  // Images: front, back, left, right are the slideshow images
  // interiorImages and exteriorImages are shown in "More Pics"
  frontImage: { type: String },
  backImage: { type: String },
  leftImage: { type: String },
  rightImage: { type: String },
  interiorImages: [{ type: String }],
  exteriorImages: [{ type: String }],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Car', CarSchema);
