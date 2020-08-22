const express = require("express");

const userController = require("../app/controllers/userController");
const factController = require("../app/controllers/factController");
const commentController = require("../app/controllers/commentController");
const { authenticateUser } = require("../app/middleware.js/authenticate");

const router = express.Router();

router.post("/api/user/register", userController.register);
router.post("/api/user/login", userController.login);
router.get("/api/user/account", authenticateUser, userController.account);
router.delete("/api/user/logout", authenticateUser, userController.logout);

router.get("/api/fact", authenticateUser, factController.list);
router.post("/api/fact", authenticateUser, factController.create);
router.get("/api/fact/:id", authenticateUser, factController.show);
router.put("/api/fact/:id", authenticateUser, factController.update);
router.delete("/api/fact/:id", authenticateUser, factController.destroy);

router.get("/api/comment", authenticateUser, commentController.list);
router.post("/api/comment", authenticateUser, commentController.create);
router.put("/api/comment/:id", authenticateUser, commentController.update);
router.delete("/api/comment/:id", authenticateUser, commentController.destroy);

module.exports = router;
