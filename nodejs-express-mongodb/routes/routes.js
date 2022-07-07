module.exports = (app) => {
  const formController = require("../Controller/controller");
  var router = require("express").Router();
  // Create a new Form data
  router.post("/", formController.create);
  // Retrieve all Form data
  router.get("/", formController.findAll);
  // Retrieve single user data
  router.get("/:id", formController.user);
  // Update a user with id
  router.put("/:id", formController.update);
  // Delete a user with id
  router.delete("/:id", formController.delete);
  app.use("/api/users", router);
};
