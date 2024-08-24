import React, { useState } from 'react';
import { Spin, Button, Layout, Card } from 'antd';
import { QueryClient, QueryClientProvider, useMutation, useQuery } from '@tanstack/react-query';
import { PostsList } from './components/PostsList';
import TodoFormModal, { TodoFormValues } from './components/TodoFormModal';
import { fetchData, createTodo, updateTodo, deleteTodo, toggleCompleted } from './api';

// Create a QueryClient instance
const queryClient = new QueryClient();

const App: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTodo, setCurrentTodo] = useState<TodoFormValues | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  // Fetch todos
  const { isLoading, data: posts } = useQuery({
    queryKey: ['posts'],
    queryFn: fetchData,
  });

  // Mutation for creating todos
  const createMutation = useMutation({
    mutationFn: createTodo,
    onSuccess: () => {
      queryClient.invalidateQueries(['posts']);
    },
  });

  // Mutation for updating todos
  const updateMutation = useMutation({
    mutationFn: updateTodo,
    onSuccess: () => {
      queryClient.invalidateQueries(['posts']);
    },
  });

  // Mutation for deleting todos
  const deleteMutation = useMutation({
    mutationFn: deleteTodo,
    onSuccess: () => {
      queryClient.invalidateQueries(['posts']);
    },
  });

  //Mutation for toggling completed status
  const toggleCompletedMutation = useMutation({
    mutationFn: toggleCompleted,
    onSuccess: () => {
      console.log('Invalidating todos query...');
      console.log('Before invalidation:', queryClient.getQueryData(['posts']));
      queryClient.invalidateQueries(['posts']);
      console.log('After invalidation:', queryClient.getQueryData(['posts']));
    },
  });


  // Handle modal visibility and form data
  const handleOpenModal = (todo?: TodoFormValues) => {
    if (todo) {
      setCurrentTodo(todo);
      setIsEditing(true);
    } else {
      setCurrentTodo(null);
      setIsEditing(false);
    }
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = (values: TodoFormValues) => {
    if (isEditing && currentTodo) {
      // Update existing todo
      updateMutation.mutate({ ...currentTodo, ...values });
    } else {
      // Create new todo
      createMutation.mutate(values);
    }
    setIsModalOpen(false);
  };

  const handleEdit = (todo: TodoFormValues) => {
    handleOpenModal(todo);
  };

  const handleDelete = (id: number) => {
    deleteMutation.mutate(id);
  };

  const handleToggleCompleted = (id: number, completed: boolean) => {
    toggleCompletedMutation.mutate({ id, completed });
  };

  if (isLoading) {
    return <Spin />;
  }

  return (
    <QueryClientProvider client={queryClient}>
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
              {posts && <PostsList 
                posts={posts}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onToggleCompleted={handleToggleCompleted}
              />}
            </div>
            <TodoFormModal
              visible={isModalOpen}
              onCancel={handleCancel}
              onSubmit={handleSubmit}
              initialValues={currentTodo || { title: '', description: '' }}
              isEditing={isEditing}
            />
          </Card>
        </Layout.Content>
      </Layout>
    </QueryClientProvider>
  );
};

export default App;
