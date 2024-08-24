// TodoFormModal.tsx
import React from 'react';
import { Modal, Form, Input, Button } from 'antd';

interface TodoFormModalProps {
  visible: boolean;
  onCancel: () => void;
  onSubmit: (values: TodoFormValues) => void;
}

export interface TodoFormValues {
  title: string;
  description: string;
}

const TodoFormModal: React.FC<TodoFormModalProps> = ({ visible, onCancel, onSubmit }) => {
  const [form] = Form.useForm();

  const handleFinish = (values: TodoFormValues) => {
    onSubmit(values);
    form.resetFields();
  };

  return (
    <Modal
      visible={visible}
      title="Add Todo"
      onCancel={onCancel}
      footer={null}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleFinish}
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
          <Button type="primary" htmlType="submit">
            Add Todo
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default TodoFormModal;
