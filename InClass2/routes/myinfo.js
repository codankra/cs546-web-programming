const express = require("express");
const router = express.Router();

const myInfo = { name: 'Daniel Kramer', dateOfBirth: '2/10', hometown: 'Stamford, CT'};

router.get("/", async (req, res) => {
    res.json(myInfo)
});

module.exports = router;