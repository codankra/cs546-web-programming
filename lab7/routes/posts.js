const express = require("express");
const router = express.Router();
const data = require("../data");
const postData = data.posts;

router.get("/:id", async (req, res) => {
  try {
    const post = await postData.get(req.params.id);
    res.json(post);
  } catch (e) {
    res.status(404).json({ error: "Post not found" });
  }
});

router.get("/", async (req, res) => {
  try {
    const postList = await postData.getAll();
    res.json(postList);
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

router.post("/", async (req, res) => {
  const blogPostData = req.body;
  if (!blogPostData) {
    res.status(400).json({ error: "You must provide data to create a user" });
    return;
  }

  if (!blogPostData.title) {
    res.status(400).json({ error: "You must provide a title" });
    return;
  }

  if (!blogPostData.author) {
    res.status(400).json({ error: "You must provide an author id" });
    return;
  }
  if (!blogPostData.content) {
    res.status(400).json({ error: "You must provide post content" });
    return;
  }
  try {
    const { title, author, content } = blogPostData;
    const newPost = await postData.addPost(title, content, author);

    res.json(newPost);
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: e });
  }
});

router.put("/:id", async (req, res) => {
  const updatedData = req.body;
  if (!updatedData.newTitle && !updatedData.newContent) {
    res.status(400).json({ error: "You must provide a new title or content" });
    return;
  }
  try {
    await postData.get(req.params.id);
  } catch (e) {
    console.log(e);
    res.status(404).json({ error: "Post not found" });
    return;
  }

  try {
    const updatedPost = await postData.updatePost(req.params.id, updatedData);
    res.json(updatedPost);
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await postData.get(req.params.id);
  } catch (e) {
    res.status(404).json({ error: "Post not found" });
  }
  try {
    const data = await postData.removePost(req.params.id);
    console.log(data);
    const returnObj = {
      "deleted": true,
      data
    }
    res.json(returnObj);
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

module.exports = router;