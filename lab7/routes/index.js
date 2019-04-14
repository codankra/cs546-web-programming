const animalsRoutes = require("./animals");
const likesRoutes = require("./likes");
const postsRoutes = require("./posts");

const constructorMethod = app => {
  app.use("/animals", animalsRoutes);
  app.use("/likes", likesRoutes);
  app.use("/posts", postsRoutes);

  app.use("*", (req, res) => {
    res.status(404).json({ error: "Not found" });
  });
};

module.exports = constructorMethod;