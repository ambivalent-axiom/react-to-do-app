import React from 'react';
import { Input, Button, List, Typography } from 'antd';
import PostCommentItem from './PostCommentItem';
import { Comment } from '../../../api/types';

const { Title } = Typography;

interface PostCommentsProps {
  comments: Comment[];
  isEditing: string | null;
  editedCommentContent: string;
  newComment: string;
  onEditComment: (comment: Comment) => void;
  onDeleteComment: (commentId: string) => void;
  onUpdateComment: () => void;
  onCancelEdit: () => void;
  onChangeEditContent: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeNewComment: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onAddComment: () => void;
}

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
