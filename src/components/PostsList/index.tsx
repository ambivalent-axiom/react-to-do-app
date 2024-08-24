import { List } from 'antd';
import { PostListItem } from './PostListItem';
import { PostListProps } from '../../api/types';

export const PostsList = ({ posts, onEdit, onShow, onDelete, onToggleCompleted }: PostListProps) => {
  return (
    <List
      dataSource={posts}
      renderItem={post => (
        <PostListItem 
          key={post.id}
          title={post.title}
          description={post.description}
          completed={post.completed}
          onShow={() => onShow(post.id)}
          onEdit={() => onEdit(post)}
          onDelete={() => onDelete(post.id)}
          onToggleCompleted={() => onToggleCompleted(post.id, post.completed)}
        />
      )}
    />
  );
};
