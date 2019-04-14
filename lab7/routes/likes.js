const express = require("express");
const router = express.Router();
const data = require("../data");
const postData = data.posts;
const animalData = data.animals;

router.post("/:id", async (req, res) => {
  const pID = req.query.postId;
  try {
    await postData.get(pID);
    await animalData.get(req.params.id);
  } catch (e) {
    res.status(404).json({ error: "Post or animal not found" });
    return;
  }
  try{
    await animalData.like(req.params.id, pID);
    res.sendStatus(200);
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: e });
  }
});
router.delete("/:id", async (req, res) => {
  try {
    await postData.get(req.query.postId);
    await animalData.get(req.params.id);
  } catch (e) {
    res.status(404).json({ error: "Post or animal not found" });
  }
  try {
    await animalData.unlike(req.params.id, req.query.postId);
    res.sendStatus(200);
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

module.exports = router;