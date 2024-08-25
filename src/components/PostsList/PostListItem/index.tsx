import { Card, Typography, Button, Checkbox, Space, Popconfirm } from 'antd';
import { EditOutlined, DeleteOutlined, FolderOpenOutlined } from '@ant-design/icons';
import { PostListItemProps } from '../../../api/types';

export const PostListItem = ({
  title,
  description,
  completed,
  onShow,
  onEdit,
  onDelete,
  onToggleCompleted,
}: PostListItemProps) => {
  return (
    <Card
      bordered
      className="post-list-item"
      style={{ marginBottom: '16px', opacity: completed ? 0.6 : 1 }}
    >
      <Space direction="vertical" style={{ width: '100%' }}>
        <Space align="start" style={{ justifyContent: 'space-between', width: '100%' }}>
          <Typography.Title level={3} style={{ marginBottom: '8px' }}>
            {title}
          </Typography.Title>
          <Checkbox checked={completed} onChange={onToggleCompleted}>
            Completed
          </Checkbox>
        </Space>
        <Typography.Text>Description: {description}</Typography.Text>
        <Space style={{ marginTop: '8px' }}>
          <Button icon={<FolderOpenOutlined />} onClick={onShow}>
            Open
          </Button>
          <Button icon={<EditOutlined />} onClick={onEdit}>
            Edit
          </Button>
          <Popconfirm
                      title="Are you sure you want to delete this post?"
                      onConfirm={onDelete}
                      okText="Yes"
                      cancelText="No"
                    >
            <Button icon={<DeleteOutlined />} danger>
              Delete
            </Button>
          </Popconfirm>
        </Space>
      </Space>
    </Card>
  );
};
