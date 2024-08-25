import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchTodoById } from '../../api';
import { Route } from '../../routes/show.$postId';
import { Layout, Card, Spin } from 'antd';

const PostShow: React.FC = () => {
  const { postId } = Route.useParams();
  const { data: post, isLoading, error } = useQuery({
    queryKey: ['post', postId],
    queryFn: () => fetchTodoById(postId),
    enabled: !!postId, 
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading post</div>;
  if (!post) return <div>Post not found</div>;

  if (isLoading) return <Spin />;
  return (
    <>
    <div className="p-2" style={{ marginLeft: '40px' }}>
      <h3>{post.title}</h3>
    </div>
    <Layout style={{ width: '100vw', height: '100vh', padding: '20px' }}>
        <Layout.Content style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '20px' }}>
            <Card
            bordered
            style={{ width: '100%', maxWidth: '800px', padding: '20px', position: 'relative' }}
            />
        </Layout.Content>
    </Layout>
    </>
  );
};
  
export default PostShow;