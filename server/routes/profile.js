const express = require("express");
const {
  postProfile,
  getAllProfiles,
  getProfileById,
  updateProfile,
} = require("../controllers/profile.js");

const router = express.Router();

router.post("/add", postProfile);
router.get("/all", getAllProfiles);
router.get("/:profileId", getProfileById);
router.put("/:profileId", updateProfile);

module.exports = router;
