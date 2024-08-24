// App.tsx
import React, { useState } from 'react';
import { Spin, Button } from 'antd';
import { Flex } from 'antd';
import { QueryClient, QueryClientProvider, useMutation, useQuery } from '@tanstack/react-query';
import { PostsList } from './components/PostsList';
import TodoFormModal, { TodoFormValues } from './components/TodoFormModal';
import { fetchData, createTodo } from './api';

const queryClient = new QueryClient();

const App: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const { isLoading, data: posts } = useQuery({
    queryKey: ['todos'],
    queryFn: fetchData,
  });

  const mutation = useMutation({
    mutationFn: createTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleOpenModal = () => {
    setIsModalVisible(true);
  };

  const handleSubmit = (values: TodoFormValues) => {
    mutation.mutate(values);
    setIsModalVisible(false);
  };

  if (isLoading) {
    return <Spin />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <main style={{ width: "100vw" }}>
        <Flex justify="center" align="center" style={{ padding: "20px" }}>
          <div>
            <Button type="primary" onClick={handleOpenModal}>
              Add Todo
            </Button>
            {posts && <PostsList posts={posts} />}
          </div>
          <TodoFormModal
            visible={isModalVisible}
            onCancel={handleCancel}
            onSubmit={handleSubmit}
          />
        </Flex>
      </main>
    </QueryClientProvider>
  );
};

export default App;
