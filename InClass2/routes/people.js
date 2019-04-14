const express = require("express");
const router = express.Router();
const data = require("../data");
const peopleData = data.people;

router.get("/:id", async (req, res) => {
  try {

    const people = await peopleData.getPersonById(req.params.id);
    res.json(people);
  } catch (e) {
    res.status(404).json({ message: "People not found" });
  }
});

router.get("/", async (req, res) => {
  try {
      console.log ("In get people route")
    const peopleList = await peopleData.getPeople();
    res.json(peopleList);
  } catch (e) {
    res.status(500).send();
  }
});

router.post("/", async (req, res) => {
  // Not implemented
  res.status(501).send();
});

module.exports = router;