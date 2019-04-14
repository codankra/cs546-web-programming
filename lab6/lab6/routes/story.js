const express = require("express");
const router = express.Router();

const story = {
    "storyTitle": "The Perfect Crime",
    "story": "Once apon a time I had a good story...\n but it was difficult to copy and paste, so I replaced it with this sentence."
};

router.get("/", async (req, res) => {
    try{
        res.json(story)
    }
    catch(e){
        res.json({ error: "unable to get data." });
    }
});

module.exports = router;