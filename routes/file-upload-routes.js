const express = require("express");
const router = express.Router();


const uploader = require("../configs/cloudinary-setup");

router.post("/upload", uploader.single("poster"), (req, res, next) => {

  if (!req.file) {
    next(new Error("No poster uploaded!"));
    return;
  }
  res.json({ secure_url: req.file.secure_url });
});

router.post("/upload2", uploader.single("fan_art"), (req, res, next) => {

  if (!req.file) {
    next(new Error("No fan_art uploaded!"));
    return;
  }
  res.json({ secure_url: req.file.secure_url });
});

module.exports = router;