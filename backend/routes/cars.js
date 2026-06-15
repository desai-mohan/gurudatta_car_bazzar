const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const Car = require("../models/Car");
const dotenv = require("dotenv");
// Multer storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = path.join(__dirname, "../uploads");
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname.replace(/\s/g, "_"));
  },
});
const upload = multer({ storage });
const uploadFields = upload.fields([
  { name: "frontImage", maxCount: 1 },
  { name: "backImage", maxCount: 1 },
  { name: "leftImage", maxCount: 1 },
  { name: "rightImage", maxCount: 1 },
  { name: "interiorImages", maxCount: 10 },
  { name: "exteriorImages", maxCount: 10 },
]);
dotenv.config();
router.post("/admin/login", (req, res) => {
  console.log("hitted");
  if (req.body.password === process.env.ADMIN_PASSWORD) {
    return res.json({ success: true });
  }

  res.status(401).json({ success: false });
});
// GET all cars
router.get("/", async (req, res) => {
  try {
    const cars = await Car.find().sort({ createdAt: -1 });
    res.json(cars);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
// GET single car
router.get("/:id", async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) return res.status(404).json({ message: "Car not found" });
    res.json(car);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
// POST add new car (admin)
router.post("/", uploadFields, async (req, res) => {
  try {
    const body = req.body;
    const files = req.files || {};

    const getPath = (field) =>
      files[field] ? `/uploads/${files[field][0].filename}` : "";

    const getMultiPaths = (field) =>
      files[field] ? files[field].map((f) => `/uploads/${f.filename}`) : [];

    const car = new Car({
      name: body.name,
      model: body.model,
      year: body.year,
      price: body.price,
      km: body.km,
      fuel: body.fuel,
      transmission: body.transmission,
      color: body.color,
      owner: body.owner,
      tireCondition: body.tireCondition,
      financeAvailable: body.financeAvailable === "true",
      description: body.description,
      frontImage: getPath("frontImage"),
      backImage: getPath("backImage"),
      leftImage: getPath("leftImage"),
      rightImage: getPath("rightImage"),
      interiorImages: getMultiPaths("interiorImages"),
      exteriorImages: getMultiPaths("exteriorImages"),
    });
    const savedCar = await car.save();
    res.status(201).json(savedCar);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
// DELETE car (admin)
router.delete("/:id", async (req, res) => {
  try {
    await Car.findByIdAndDelete(req.params.id);
    res.json({ message: "Car deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
module.exports = router;
