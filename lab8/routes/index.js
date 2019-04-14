const allRoutes = require("./all");

const constructorMethod = app => {
  app.use("/", allRoutes);


  app.use("*", (req, res) => {
    res.status(404).json({ error: "Not found" });
  });
};

module.exports = constructorMethod;