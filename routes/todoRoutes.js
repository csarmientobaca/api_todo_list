const express = require("express");
const router = express.Router();
const todoController = require("../controllers/todoController");
const authenticate = require("../middleware/firebaseMiddleware");

router.get("/all", authenticate, todoController.getTodos);
router.get("/:id", authenticate, todoController.getTodoById);
router.post("/", authenticate, todoController.createTodo);
router.put("/:id", authenticate, todoController.updateTodo);
router.delete("/:id", authenticate, todoController.deleteTodo);

module.exports = router;
