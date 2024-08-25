import { TodoFormValues } from "../api/types";
import { Post, Comment } from "./types";

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
  description,
  comments = [],
}: {
  title: string, 
  description: string,
  comments?: Comment[]
}) => {
  const response = await fetch('http://localhost:3004/posts', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, description, comments }),
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

export const toggleCompleted = async (
  todo: { 
    id: string; 
    completed: boolean 
  }) => {
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

export const addComment = async ({ 
  postId, 
  content 
}: { 
  postId: string, 
  content: string 
}): Promise<Post> => {
  const post = await fetchTodoById(postId);
  const newComment = { id: Date.now().toString(), content };
  post.comments.push(newComment);
  return updateTodo(post);
};

export const deleteComment = async ({ 
  postId, 
  commentId 
}: { 
  postId: string, 
  commentId: string 
}): Promise<Post> => {
  const post = await fetchTodoById(postId);
  post.comments = post.comments.filter((comment: Comment) => comment.id !== commentId);
  return updateTodo(post);
};

export const updateComment = async ({ 
  postId, 
  commentId, 
  content 
}: { 
  postId: string, 
  commentId: string, 
  content: string 
}): Promise<Post> => {
  const post = await fetchTodoById(postId);
  const updatedComments = post.comments.map((comment: Comment) => 
    comment.id === commentId ? { ...comment, content } : comment
  );
  const updatedTodo = { ...post, comments: updatedComments };
  const response = await fetch(`http://localhost:3004/posts/${postId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updatedTodo),
  });
  if (!response.ok) throw new Error('Failed to update comment');
  return response.json();
};