import React, { useEffect } from 'react';
import { Modal, Form, Input, message, Typography } from 'antd';
import { Task } from '../types/task.types';
const { Text } = Typography;

// Props interface
interface TaskFormProps {
  visible: boolean;          // Is modal visible?
  onCancel: () => void;      // Function to close modal
  onSubmit: (values: any) => Promise<void>; // Function to submit form
  initialValues?: Task;      // Optional: existing task data for editing
  title: string;             // Modal title
}

const TaskForm: React.FC<TaskFormProps> = ({
  visible,
  onCancel,
  onSubmit,
  initialValues,
  title,
}) => {
  // Form instance - allows us to control the form programmatically
  const [form] = Form.useForm();

  // When initialValues change, update form fields
  useEffect(() => {
    if (visible && initialValues) {
      // Set form fields with existing task data
      form.setFieldsValue({
        name: initialValues.name,
        owner: initialValues.owner,
        command: initialValues.command,
      });
    } else if (visible) {
      // Clear form for new task
      form.resetFields();
    }
  }, [visible, initialValues, form]);

  // Handle form submission
  const handleOk = async () => {
    try {
      // Validate all form fields
      const values = await form.validateFields();
      
      // Call the onSubmit function passed from parent
      await onSubmit(values);
      
      // Clear form after successful submission
      form.resetFields();
    } catch (error) {
      // Validation failed or submission failed
      console.error('Form error:', error);
    }
  };

  // Handle modal cancel
  const handleCancel = () => {
    form.resetFields(); // Clear form
    onCancel(); // Call parent's onCancel function
  };

  return (
    <Modal
      title={title}
      open={visible} // 'open' is the new prop name in Ant Design 5
      onOk={handleOk}
      onCancel={handleCancel}
      okText="Submit"
      cancelText="Cancel"
      width={600}
    >
      <Form
        form={form}
        layout="vertical" // Labels appear above inputs
        name="taskForm"
      >
        {/* Task Name Field */}
        <Form.Item
          name="name"
          label="Task Name"
          rules={[
            { required: true, message: 'Please enter task name' },
            { min: 3, message: 'Name must be at least 3 characters' },
            { max: 50, message: 'Name must be less than 50 characters' },
          ]}
          tooltip="A descriptive name for your task"
        >
          <Input 
            placeholder="e.g., Backup Database" 
            size="large"
          />
        </Form.Item>

        {/* Owner Field */}
        <Form.Item
          name="owner"
          label="Owner"
          rules={[
            { required: true, message: 'Please enter owner name' },
            { min: 2, message: 'Owner name must be at least 2 characters' },
          ]}
          tooltip="Person responsible for this task"
        >
          <Input 
            placeholder="e.g., John Doe" 
            size="large"
          />
        </Form.Item>

        {/* Command Field */}
        <Form.Item
          name="command"
          label="Command"
          rules={[
            { required: true, message: 'Please enter command to execute' },
            { min: 2, message: 'Command must be at least 2 characters' },
          ]}
          tooltip="Shell command to execute (be careful with permissions)"
        >
          <Input.TextArea
            placeholder="e.g., dir or echo Hello World"
            rows={4}
            style={{ fontFamily: 'monospace' }}
          />
        </Form.Item>

        {/* Warning message */}
        <div style={{ 
          padding: '12px', 
          background: '#fff7e6', 
          border: '1px solid #ffd591',
          borderRadius: '4px',
          marginBottom: '16px',
        }}>
          <Text type="warning">
            ⚠️ <strong>Warning:</strong> Be careful with commands. 
            Only use safe commands that you understand.
          </Text>
        </div>
      </Form>
    </Modal>
  );
};

export default TaskForm;
