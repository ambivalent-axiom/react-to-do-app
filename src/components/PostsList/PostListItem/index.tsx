import { Card, Typography } from 'antd';

type PostListItemProps = {
    title: string;
    views: number;
};

export const PostListItem = ({ title, views }: PostListItemProps) => {
    return (
        <Card bordered className="post-list-item" style={{ marginBottom: '16px' }}>
            <Typography.Title level={3} style={{ marginBottom: '8px' }}>
                {title}
            </Typography.Title>
            <Typography.Text>
                Views: {views}
            </Typography.Text>
        </Card>
    );
};