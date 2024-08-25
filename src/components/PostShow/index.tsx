import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchTodoById, updateTodo, addComment, deleteComment, updateComment } from '../../api';
import { Route } from '../../routes/show.$postId';
import { Card, Typography, Spin, Switch, message, Layout } from 'antd';
import { Comment } from '../../api/types'
import PostComments from './PostComments';

const { Title, Text } = Typography;

const PostShow: React.FC = () => {
  const { postId } = Route.useParams();
  const [newComment, setNewComment] = useState('');
  const queryClient = useQueryClient();
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [editedCommentContent, setEditedCommentContent] = useState('');

  const { data: post, isLoading, error } = useQuery({
    queryKey: ['post', postId],
    queryFn: () => fetchTodoById(postId),
    enabled: !!postId, 
  });

  const updateTodoMutation = useMutation({
    mutationFn: updateTodo,
    onSuccess: () => {
      queryClient.invalidateQueries(['post', postId]);
      message.success('Todo updated successfully');
    },
  });

  const addCommentMutation = useMutation({
    mutationFn: addComment,
    onSuccess: () => {
      queryClient.invalidateQueries(['post', postId]);
      setNewComment('');
      message.success('Comment added successfully');
    },
  });

  const deleteCommentMutation = useMutation({
    mutationFn: deleteComment,
    onSuccess: () => {
      queryClient.invalidateQueries(['post', postId]);
      message.success('Comment deleted successfully');
    },
  });

  const updateCommentMutation = useMutation({
    mutationFn: updateComment,
    onSuccess: () => {
      queryClient.invalidateQueries(['post', postId]);
      setEditingCommentId(null);
      setEditedCommentContent('');
      message.success('Comment updated successfully');
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading post</div>;
  if (!post) return <div>Post not found</div>;
  if (isLoading) return <Spin />;

  const handleToggleCompleted = () => {
    updateTodoMutation.mutate({ ...post, completed: !post.completed });
  };

  const handleAddComment = () => {
    if (newComment.trim()) {
      addCommentMutation.mutate({ postId, content: newComment });
    }
  };

  const handleDeleteComment = (commentId: string) => {
    deleteCommentMutation.mutate({ postId, commentId });
  };

  const handleEditComment = (comment: Comment) => {
    setEditingCommentId(comment.id);
    setEditedCommentContent(comment.content);
  };

  const handleUpdateComment = () => {
    if (editingCommentId && editedCommentContent.trim()) {
      updateCommentMutation.mutate({
        postId: post.id,
        commentId: editingCommentId,
        content: editedCommentContent,
      });
    }
  };

  const handleCancelEdit = () => {
    setEditingCommentId(null);
    setEditedCommentContent('');
  };

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
            title={<Title level={2}>{post.title}</Title>} extra={
              <Switch
              checked={post.completed}
              onChange={handleToggleCompleted}
              checkedChildren="Completed"
              unCheckedChildren="Incomplete"
            />
          }>
            <Text>{post.description}</Text>
          
            <PostComments
              comments={post.comments}
              isEditing={editingCommentId}
              editedCommentContent={editedCommentContent}
              newComment={newComment}
              onEditComment={handleEditComment}
              onDeleteComment={handleDeleteComment}
              onUpdateComment={handleUpdateComment}
              onCancelEdit={handleCancelEdit}
              onChangeEditContent={(e) => setEditedCommentContent(e.target.value)}
              onChangeNewComment={(e) => setNewComment(e.target.value)}
              onAddComment={handleAddComment}
            />
          </Card>
        </Layout.Content>
      </Layout>
    </>
  );
};
export default PostShow;