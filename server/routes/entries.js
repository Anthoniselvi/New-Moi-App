const express = require("express");
const entriesController = require("../controllers/entries.js");

const router = express.Router();

router.post("/add", entriesController.postEntry);
router.get("/all", entriesController.getAllEntries);
router.get("/single/:entryId", entriesController.getEntryByEntryId);
router.get("/all/:eventId", entriesController.getAllEntriesByEventId);
router.put("/edit/:entryId", entriesController.updateEntryByEntryId);
router.delete("/delete/:entryId", entriesController.deleteEntryByEntryId);
router.get("/total/:profileId", entriesController.getTotals);
router.get(
  "/allentries/:profileId",
  entriesController.getAllEntriesByProfileId
);

module.exports = router;
