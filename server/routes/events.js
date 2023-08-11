const express = require("express");
const eventsController = require("../controllers/events.js");

const router = express.Router();

router.post("/add", eventsController.postEvent);
router.get("/all", eventsController.getAllEvents);
router.get("/single/:eventId", eventsController.getEventByEventId);
router.get("/all/:profileId", eventsController.getEventsByProfileId);
router.put("/edit/:eventId", eventsController.updateEventByEventId);
router.delete("/delete/:eventId", eventsController.deleteEventByEventId);

module.exports = router;
