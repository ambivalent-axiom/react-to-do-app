import React, { useEffect } from 'react';
import { Modal, Form, Input, Button } from 'antd';

interface TodoFormModalProps {
  visible: boolean;
  onCancel: () => void;
  onSubmit: (values: TodoFormValues) => void;
  initialValues: TodoFormValues;
  isEditing: boolean;
}

export interface TodoFormValues {
  title: string;
  description: string;
}

const TodoFormModal = ({ 
  visible, 
  onCancel, 
  onSubmit, 
  initialValues, 
  isEditing 
}: TodoFormModalProps) => {

  const [form] = Form.useForm();

  // Set form values when modal is opened or initialValues changes
  useEffect(() => {
    form.setFieldsValue(initialValues);
  }, [visible, initialValues, form]);

  const handleFinish = (values: TodoFormValues) => {
    onSubmit(values);
    form.resetFields();
  };

  return (
    <Modal
      open={visible}
      title={isEditing ? "Edit Todo" : "Add Todo"}
      onCancel={onCancel}
      footer={null}
    >
      <Form
        form={form}
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
          <Button type="primary" htmlType="submit">
            {isEditing ? "Update Todo" : "Add Todo"}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default TodoFormModal;
