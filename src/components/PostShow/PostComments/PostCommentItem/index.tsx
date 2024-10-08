import React from 'react';
import { Button, Input, List, Popconfirm, Typography } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { PostCommentItemProps } from '../../../../api/types';

const { Text } = Typography;

const PostCommentItem: React.FC<PostCommentItemProps> = ({
  comment,
  isEditing,
  editedCommentContent,
  onEdit,
  onDelete,
  onUpdate,
  onCancelEdit,
  onContentChange
}) => {
  return (
    <List.Item
      actions={[
        <Button 
          icon={<EditOutlined />} 
          onClick={() => onEdit(comment)} 
        />,
        <Popconfirm
          title="Are you sure you want to delete this comment?"
          onConfirm={() => onDelete(comment.id)}
          okText="Yes"
          cancelText="No"
        >
          <Button 
            icon={<DeleteOutlined />} 
            danger 
          />
        </Popconfirm>
      ]}
    >
      {isEditing ? (
        <>
          <Input
            value={editedCommentContent}
            onChange={onContentChange}
          />
          <Button 
            type="primary"
            onClick={onUpdate}
            style={{ marginLeft: 10 }}
          >
            Save
          </Button>
          <Button 
            onClick={onCancelEdit}
            style={{ marginLeft: 10 }}
          >
            Cancel
          </Button>
        </>
      ) : (
        <Text>{comment.content}</Text>
      )}
    </List.Item>
  );
};
export default PostCommentItem;
