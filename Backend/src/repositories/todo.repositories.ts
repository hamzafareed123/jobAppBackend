import { Todo } from "../models/Todo";

export const findTodoById = async (userId: string) => {
  return await Todo.findById(userId);
};

export const createTodoInDB = async (todoData: {
  userId: string;
  todoName: string;
  description?: string;
}) => {
  return await Todo.create(todoData);
};

export const deleteTodoInDB = async (todoId: string) => {
  return await Todo.findByIdAndDelete(todoId);
};
