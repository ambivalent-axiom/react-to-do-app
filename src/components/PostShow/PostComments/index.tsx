import React from 'react';
import { Input, Button, List, Typography } from 'antd';
import PostCommentItem from './PostCommentItem';
import { PostCommentsProps } from '../../../api/types';

const { Title } = Typography;

const PostComments: React.FC<PostCommentsProps> = ({
  comments,
  isEditing,
  editedCommentContent,
  newComment,
  onEditComment,
  onDeleteComment,
  onUpdateComment,
  onCancelEdit,
  onChangeEditContent,
  onChangeNewComment,
  onAddComment
}) => {
  return (
    <div>
      <Title level={4}>Comments</Title>
      <List
        dataSource={comments}
        renderItem={(comment) => (
          <PostCommentItem
            comment={comment}
            isEditing={isEditing === comment.id}
            editedCommentContent={editedCommentContent}
            onEdit={onEditComment}
            onDelete={onDeleteComment}
            onUpdate={onUpdateComment}
            onCancelEdit={onCancelEdit}
            onContentChange={onChangeEditContent}
          />
        )}
      />
      <Input.TextArea
        value={newComment}
        onChange={onChangeNewComment}
        placeholder="Add a new comment"
        style={{ marginTop: 20 }}
      />
      <Button
        type="primary"
        onClick={onAddComment}
        style={{ marginTop: 10 }}
      >
        Add Comment
      </Button>
    </div>
  );
};

export default PostComments;
