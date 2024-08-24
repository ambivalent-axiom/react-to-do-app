import { List } from 'antd';
import { PostListItem } from './PostListItem';
import { Post } from '../../api/types';

type PostListProps = {
  posts: Post[];
  onEdit: (todo: Post) => void;
  onDelete: (id: number) => void;
  onToggleCompleted: (id: number, completed: boolean) => void;
}

export const PostsList = ({ posts, onEdit, onDelete, onToggleCompleted }: PostListProps) => {
  return (
    <List
      dataSource={posts}
      renderItem={post => (
        <PostListItem 
          key={post.id}
          title={post.title}
          description={post.description}
          completed={post.completed}
          onEdit={() => onEdit(post)}
          onDelete={() => onDelete(post.id)}
          onToggleCompleted={() => onToggleCompleted(post.id, post.completed)}
        />
      )}
    />
  );
};
