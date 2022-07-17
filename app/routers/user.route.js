module.exports = (app) => {
  const users = require("../controllers/user.controller");
  const router = require("express").Router();

  const auth = require("../middlewares/auth.middleware");

  router.get("/:id", users.findOne);
  router.post("/", users.create);
  router.post("/login", users.login);
  router.put("/:id", auth, users.update);
  router.delete("/:id", auth, users.delete);

  app.use("/api/users", router);
};
