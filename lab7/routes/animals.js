const express = require("express");
const router = express.Router();
const data = require("../data");
const animalData = data.animals;
const postData = data.posts;

router.get("/:id", async (req, res) => {
  try {
    const animal = await animalData.get(req.params.id);
    res.json(animal);
  } catch (e) {
    res.status(404).json({ error: "User not found" });
  }
});

router.get("/", async (req, res) => {
  try {
    const animalsList = await animalData.getAll();
    res.json(animalsList);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

router.post("/", async (req, res) => {
  const userInfo = req.body;

  if (!userInfo) {
    res.status(400).json({ error: "You must provide data to create a user" });
    return;
  }

  if (!userInfo.name) {
    res.status(400).json({ error: "You must provide a name" });
    return;
  }

  if (!userInfo.animalType) {
    res.status(400).json({ error: "You must provide a type" });
    return;
  }

  try {
    const newUser = await animalData.create(
      userInfo.name,
      userInfo.animalType
    );
    res.json(newUser);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

router.put("/:id", async (req, res) => {
  const userInfo = req.body;
  if (!userInfo.newName && !userInfo.newType) {
    res.status(400).json({ error: "You must provide a name or type" });
    return;
  }

  try {
    await animalData.get(req.params.id);
  } catch (e) {
    res.status(404).json({ error: "Animal not found" });
    return;
  }

  try {
    const updatedUser = await animalData.update(req.params.id, userInfo);
    res.json(updatedUser);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await animalData.get(req.params.id);
  } catch (e) {
    res.status(404).json({ error: "User not found" });
    return;
  }

  try {
    const data = await animalData.remove(req.params.id);
    data.posts = await postData.removeAuthor(req.params.id);
    // const data = {
    //   oldUser,
    //   allPosts
    // }
    const returnObj = {
      "deleted": true,
      data
    }
    res.json(returnObj);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
    return;
  }
});

module.exports = router;