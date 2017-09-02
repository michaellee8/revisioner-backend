module.exports = function mount(app) {
  app.get("/api/v1/user/:userId/tag", require("api/v1/user/:userId/tag/get"));
  app.get("/api/v1/user/:userId", require("api/v1/user/:userId/get"));
  app.delete(
    "/api/v1/user/tag/:userTagId",
    require("api/v1/user/tag/:userTagId/delete")
  );
  app.get("/api/v1/user/tag", require("api/v1/user/tag/get"));
  app.post("/api/v1/user/tag", require("api/v1/user/tag/post"));
  app.get("/api/v1/user", require("api/v1/user/get"));
  app.put("/api/v1/user", require("api/v1/user/put"));
  return app;
};
