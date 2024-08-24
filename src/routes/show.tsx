import { createFileRoute } from '@tanstack/react-router';
import PostShow from '../components/PostShow';

// Create a route with a dynamic segment for the post ID
export const Route = createFileRoute('/show')({
  component: PostShow,
});