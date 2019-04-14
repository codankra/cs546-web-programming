const express = require("express");
const router = express.Router();

const edu = [
    {
        "schoolName": "Stevens Institute of Technology (S.I.T.)",
        "degree": "BS Computer Science",
        "favoriteClass": "Web Development I",
        "favoriteMemory": "One of my most memorable memories from SIT is the time I wrote up lab 5 for my CS-546-A class. It is such a distinct memory, I can almost imagine myself documenting the content of the lab this very moment..."
    },
    {
        "schoolName": "Sorcerer's Illusitorium of Thaumoturgy (S.I.T.)",
        "degree": "B.S of bs",
        "favoriteClass": "Spider-Web Formulation I",
        "favoriteMemory": "One of my most memorable memories from SIT is the time I wrote up lab 5 for my Spider-Web Formulation. We concocted webs connecting the past and the present with HTML (Heavenly Teleported Magic Lithomancy)."
    },
    {
        "schoolName": "School#001",
        "degree": "Degree#001",
        "favoriteClass": "-undefined-",
        "favoriteMemory": "One of my most memorable memories from School#0001 is going to all my classes and being bored, because it happened a lot."
    }
];

router.get("/", async (req, res) => {
    try{
        res.json(edu)
    }
    catch(e){
        res.json({ error: "unable to get data." });
    }
});

//Google likes javascript, C++, and maybe C#/Java. Also python is always relevant.
//Google Slides for resume???
//Brittany Levers

module.exports = router;