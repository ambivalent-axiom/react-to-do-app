import React from 'react';
import { useParams } from '@tanstack/react-router'; // or use the appropriate method to get params
import { useQuery } from '@tanstack/react-query';
import { fetchTodoById } from '../../api'; // Import your API function to fetch a post by ID
import { Post } from '../../api/types';

// Define the component props
interface PostShowParams {
  postId: string;
}

// Component to show a specific post
const PostShow: React.FC = () => {
  // Extract postId from route parameters
  const { postId } = useParams<PostShowParams>();

  // Fetch post data
  const { data: post, isLoading, error } = useQuery<Post, Error>(
    ['post', postId],
    () => fetchTodoById(Number(postId)), // Ensure the ID is converted to a number
    {
      enabled: !!postId, // Only fetch if postId is available
    }
  );

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading post</div>;
  if (!post) return <div>Post not found</div>;

  return (
    <div className="p-2">
      <h3>{post.title}</h3>
      <p>{post.description}</p>
    </div>
  );
};

export default PostShow;
