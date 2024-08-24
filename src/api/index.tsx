import { Post } from "./types";

export const fetchData = async () => {
    const response = await fetch('http://localhost:3004/posts');
    const data: Post[] = await response.json();
    return data;
    }

export const createTodo = async ({
  title, 
  views
}: {
  title: string, 
  views: number
}) => {
  const response = await fetch('http://localhost:3004/posts', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, views }),
  });

  if (!response.ok) {
    throw new Error("Failed to create ToDo");
  }

  return response.json();
};
    