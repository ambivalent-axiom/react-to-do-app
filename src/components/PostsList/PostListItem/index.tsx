import { Card, Typography, Button, Checkbox, Space } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

type PostListItemProps = {
  title: string;
  description: string;
  completed: boolean;
  onEdit: () => void;
  onDelete: () => void;
  onToggleCompleted: () => void;
};

export const PostListItem = ({
  title,
  description,
  completed,
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
          <Button icon={<EditOutlined />} onClick={onEdit}>
            Edit
          </Button>
          <Button icon={<DeleteOutlined />} danger onClick={onDelete}>
            Delete
          </Button>
        </Space>
      </Space>
    </Card>
  );
};
