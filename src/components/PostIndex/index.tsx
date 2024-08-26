import React from 'react';
import { Spin, Button, Layout, Card, message } from 'antd';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { PostsList } from '../PostsList';
import TodoFormModal from '../TodoFormModal';
import { TodoFormValues } from '../../api/types';
import { fetchData, createTodo, updateTodo, deleteTodo, toggleCompleted } from '../../api';

const PostIndex: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [currentTodo, setCurrentTodo] = React.useState<TodoFormValues | null>(null);
  const queryClient = useQueryClient();
  
  const { isLoading, data: posts } = useQuery({
    queryKey: ['todos'],
    queryFn: fetchData,
  });
  const createMutation = useMutation({
    mutationFn: createTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
      message.success('Todo created successfully');
    },
  });
  const updateMutation = useMutation({
    mutationFn: updateTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
      message.success('Todo updated successfully');
    },
  });
  const deleteMutation = useMutation({
    mutationFn: deleteTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
      message.success('Todo deleted successfully');
    },
  });
  const toggleCompletedMutation = useMutation({
    mutationFn: toggleCompleted,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
      message.success('Todo updated successfully');
    },
  });
  const handleOpenModal = (todo?: TodoFormValues) => {
    setCurrentTodo(todo || null);
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentTodo(null);
  };
  const handleSubmit = (values: TodoFormValues) => {
    if (currentTodo) {
      updateMutation.mutate({ ...currentTodo, ...values });
    } else {
      createMutation.mutate(values);
    }
    handleCloseModal();
  };
  const handleShowTodo = (todoId: number) => {
    // Use the browser's history API to navigate
    window.location.href = `/show/${todoId}`;
  };

  if (isLoading) return <Spin />;

  return (
    <>
        <div className="p-2" style={{ marginLeft: '40px' }}>
        <h3>List of ToDo's</h3>
        </div>
        <Layout style={{ width: '100vw', height: '100vh', padding: '20px' }}>
        <Layout.Content style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '20px' }}>
            <Card
            bordered
            style={{ width: '100%', maxWidth: '800px', padding: '20px', position: 'relative' }}
            >
            <Button
                type="primary"
                onClick={() => handleOpenModal()}
                style={{ position: 'absolute', top: '30px', right: '50px' }}
            >
                Add Todo
            </Button>
            <div style={{ marginTop: '40px' }}>
                {posts && (
                <PostsList 
                    posts={posts}
                    onShow={handleShowTodo}
                    onEdit={handleOpenModal}
                    onDelete={(id) => deleteMutation.mutate(id)}
                    onToggleCompleted={(id, completed) => toggleCompletedMutation.mutate({ id, completed })}
                />
                )}
            </div>
            <TodoFormModal
                visible={isModalOpen}
                onCancel={handleCloseModal}
                onSubmit={handleSubmit}
                initialValues={currentTodo || { title: '', description: '' }}
                isEditing={!!currentTodo}
            />
            </Card>
        </Layout.Content>
        </Layout>
    </>
  );
};

export default PostIndex;