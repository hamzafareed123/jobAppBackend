import express from "express";
import { roleMiddleware } from "../middleware/role.middleware";
import { protectedRoute } from "../middleware/auth.middleware";
import {
  createTodo,
  deleteTodo,
  shareTodo,
} from "../controller/todo.controller";

const router = express.Router();

router.post("/createTodo", protectedRoute, roleMiddleware, createTodo);
router.delete("/deleteTodo/:id", protectedRoute, roleMiddleware, deleteTodo);
router.post("/shareTodo/:id", protectedRoute, roleMiddleware, shareTodo);

export default router;
