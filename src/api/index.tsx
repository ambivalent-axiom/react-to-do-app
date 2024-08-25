import { TodoFormValues } from "../components/TodoFormModal";
import { Post } from "./types";

export const fetchData = async () => {
    const response = await fetch('http://localhost:3004/posts');
    if (!response.ok) throw new Error('Network response was not ok');
    const data: Post[] = await response.json();
    return data;
};

export const fetchTodoById = async (id: string) => {
  const response = await fetch(`http://localhost:3004/posts/${id}`);
  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
};

export const createTodo = async ({
  title, 
  description
}: {
  title: string, 
  description: string
}) => {
  const response = await fetch('http://localhost:3004/posts', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, description }),
  });

  if (!response.ok) {
    throw new Error("Failed to create ToDo");
  }

  return response.json();
};

export const updateTodo = async (todo: TodoFormValues & { id: string }) => {
  const response = await fetch(`http://localhost:3004/posts/${todo.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(todo),
  });

  if (!response.ok) {
    throw new Error('Failed to update Todo');
  }

  return response.json();
};

export const deleteTodo = async (id: string) => {
  const response = await fetch(`http://localhost:3004/posts/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Failed to delete todo');
  }

  return id; // Return the id of the deleted todo
};

export const toggleCompleted = async (todo: { id: string; completed: boolean }) => {
  const response = await fetch(`http://localhost:3004/posts/${todo.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ completed: !todo.completed }),
  });

  if (!response.ok) {
    throw new Error('Failed to toggle completed status');
  }

  return response.json(); // Return updated todo
};