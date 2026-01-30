import { ITodoDocument } from "../models/Todo";
import { ITodo } from "../types/todo.types";

export const mapTodo = (todo: ITodoDocument): ITodo => ({
  id: todo._id.toString(),
  userId: todo.userId.toString(),
  todoName: todo.todoName,
  description: todo.description,
  status: todo.status,
  createdAt: todo.createdAt,
  updatedAt: todo.updatedAt,
});
