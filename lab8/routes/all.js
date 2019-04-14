const express = require("express");
const router = express.Router();
const people = require("../peopleData");

router.get("/", async (req, res) => {
    try{
        res.render('layouts/index');
    }
    catch(e){
        res.status(404).json({ error: "Page not render-able" + e });
    }
});
router.post("/search", async (req, res) => {
    do{
      try {
        if (!req.body.personName){
          res.status(400).render('layouts/error');
          return;
        }
        const peopleD = await people.getPeopleBySubname(req.body.personName);
        res.render('layouts/search', { personName: req.body.personName, people:  peopleD });
        //res.redirect('layouts/search', 200);
        return;
    } catch (e) {
      console.log(e);
      res.status(404).json({ error: "Page not render-able" + e });
    }
  } while(false);
});
router.get("/details/:id", async (req, res) => {
    try {

      const personinfo = await people.getPersonById(Number(req.params.id));
      const personName = personinfo.firstName + " " + personinfo.lastName;
      personinfo.personName = personName;
      console.log(personinfo);
      if(personName == " " || !personinfo){
        res.status(400).render('layouts/error');
      }
      res.render('layouts/details', personinfo);
    } catch (e) {
      console.log(e);
      res.status(404).json({ error: "Page not render-able" + e });
    }
});

module.exports = router;