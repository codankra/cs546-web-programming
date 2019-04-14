const express = require("express");
const router = express.Router();

const about = { 
    "name": "Daniel Kramer", 
    "cwid": "10426217", 
    "biography": "My name is Daniel Kramer, I was born about 20 years ago, and I'm currently doing a variety of coding activities as a CS student at Stevens Institute of Technology.\nA fun fact about me is that I am not very good at and do not like creative writing assignments or activities, nor do I like describing myself. Thank you for reading my short 2-paragraph biography!",
    "favoriteShows": ["The Good Place", "Curb Your Enthusiasm", "Parks and Recreation", "Narcos", "Arrested Development", "Black Mirror", "One Punch Man", "Silicon Valley", "Sherlock", "Game of Thrones"],
    "hobbies": ["Coding (duh.)", "Cooking", "Hiking", "Working Out", "Sailing", "Reading, and listening to audiobooks/podcasts", "Taekwondo", "Time Tracking/Task Management/Scheduling", "Learning the basics of new languages (programming/spoken)", "Finishing Lists"]
};

router.get("/", async (req, res) => {
    try{
        res.json(about)
    }
    catch(e){
        res.json({ error: "unable to get data." });
    }
});

module.exports = router;