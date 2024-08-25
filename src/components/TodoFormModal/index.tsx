import React from 'react';
import { Modal, Form, Input, Button } from 'antd';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { TodoFormModalProps, TodoFormValues } from '../../api/types';

const TodoFormModal: React.FC<TodoFormModalProps> = ({ 
  visible, 
  onCancel, 
  onSubmit, 
  initialValues, 
  isEditing 
}) => {
  const [form] = Form.useForm();
  const queryClient = useQueryClient();

  // Use React Query mutation
  const mutation = useMutation({
    mutationFn: onSubmit,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries(['todos']);
      form.resetFields();
      onCancel();
    },
  });

  // Set form values when modal is opened or initialValues changes
  React.useEffect(() => {
    if (visible) {
      form.setFieldsValue(initialValues);
    }
  }, [visible, initialValues, form]);

  const handleFinish = (values: TodoFormValues) => {
    mutation.mutate(values);
  };

  return (
    <Modal
      open={visible}
      title={isEditing ? "Edit Todo" : "Add Todo"}
      onCancel={onCancel}
      footer={null}
    >
      <Form
        form={form}  // Ensure form prop is passed
        layout="vertical"
        onFinish={handleFinish}
        initialValues={initialValues}
      >
        <Form.Item
          label="Title"
          name="title"
          rules={[{ required: true, message: 'Please input the title!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Description"
          name="description"
          rules={[{ required: true, message: 'Please input the description!' }]}
        >
          <Input.TextArea />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={mutation.isLoading}>
            {isEditing ? "Update Todo" : "Add Todo"}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default TodoFormModal;
