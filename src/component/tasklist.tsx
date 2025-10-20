import React, { useState, useEffect } from 'react';
import { 
  Layout, 
  Typography, 
  Input, 
  Button, 
  Space, 
  message,
  Spin,
  Empty,
} from 'antd';
import {
  PlusOutlined,
  SearchOutlined,
  ReloadOutlined,
} from '@ant-design/icons';
import { Task } from '../types/task.types';
import taskService from '../services/taskservice';
import TaskCard from './taskcard';
import TaskForm from './taskform';
import ExecutionHistory from './history';

const { Header, Content } = Layout;
const { Title } = Typography;
const { Search } = Input;

const TaskList: React.FC = () => {
  // ==================== STATE MANAGEMENT ====================
  // State is like the component's memory - it remembers values
  
  // Array to store all tasks
  const [tasks, setTasks] = useState<Task[]>([]);
  
  // Boolean to track if we're loading data
  const [loading, setLoading] = useState<boolean>(true);
  
  // Boolean to show/hide the create task modal
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  
  // Store the task being edited (null if not editing)
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  
  // Store the task whose history we're viewing
  const [historyTask, setHistoryTask] = useState<Task | null>(null);
  
  // Search input value
  const [searchTerm, setSearchTerm] = useState<string>('');

  // ==================== EFFECTS ====================
  // useEffect runs code when component loads or when dependencies change
  
  // This runs ONCE when component first loads (empty [] means no dependencies)
  useEffect(() => {
    loadTasks(); // Fetch tasks from backend
  }, []); // Empty array = run only once on mount

  // ==================== DATA FETCHING ====================
  
  // Function to load all tasks from backend
  const loadTasks = async () => {
    try {
      setLoading(true); // Show loading spinner
      const data = await taskService.getAllTasks(); // Call API
      setTasks(data); // Update state with fetched tasks
      message.success('Tasks loaded successfully!'); // Show success message
    } catch (error) {
      message.error('Failed to load tasks'); // Show error message
      console.error(error);
    } finally {
      setLoading(false); // Hide loading spinner (runs whether success or error)
    }
  };

  // ==================== SEARCH FUNCTIONALITY ====================
  
  const handleSearch = async (value: string) => {
    if (!value.trim()) {
      // If search is empty, reload all tasks
      loadTasks();
      return;
    }

    try {
      setLoading(true);
      const data = await taskService.searchTasksByName(value);
      setTasks(data);
      message.success(`Found ${data.length} task(s)`);
    } catch (error) {
      message.error('No tasks found');
      setTasks([]); // Clear tasks on error
    } finally {
      setLoading(false);
    }
  };

  // ==================== CRUD OPERATIONS ====================
  
  // CREATE: Add new task
  const handleCreate = async (values: any) => {
    try {
      await taskService.createTask(values);
      message.success('Task created successfully!');
      setIsModalVisible(false); // Close modal
      loadTasks(); // Refresh task list
    } catch (error: any) {
      // Check if error has a response from backend
      if (error.response?.data?.message) {
        message.error(error.response.data.message);
      } else {
        message.error('Failed to create task');
      }
    }
  };

  // UPDATE: Edit existing task
  const handleUpdate = async (values: any) => {
    if (!editingTask) return;

    try {
      await taskService.updateTask(editingTask.id, values);
      message.success('Task updated successfully!');
      setEditingTask(null); // Close edit mode
      loadTasks(); // Refresh task list
    } catch (error: any) {
      if (error.response?.data?.message) {
        message.error(error.response.data.message);
      } else {
        message.error('Failed to update task');
      }
    }
  };

  // DELETE: Remove task
  const handleDelete = async (id: string) => {
    try {
      await taskService.deleteTask(id);
      message.success('Task deleted successfully!');
      loadTasks(); // Refresh task list
    } catch (error) {
      message.error('Failed to delete task');
    }
  };

  // EXECUTE: Run task command
  const handleExecute = async (id: string) => {
    try {
      message.loading('Executing task...', 0); // Show loading message
      const updatedTask = await taskService.executeTask(id);
      message.destroy(); // Clear loading message
      message.success('Task executed successfully!');
      
      // Update the task in our list with new execution data
      setTasks(prevTasks =>
        prevTasks.map(task => 
          task.id === id ? updatedTask : task
        )
      );
      
      // Optionally show execution history
      setHistoryTask(updatedTask);
    } catch (error) {
      message.destroy();
      message.error('Failed to execute task');
    }
  };

  // ==================== RENDER UI ====================
  
  return (
    <Layout style={{ minHeight: '100vh', background: '#f0f2f5' }}>
      {/* Header Section */}
      <Header 
        style={{ 
          background: '#001529', 
          padding: '0 50px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Title level={2} style={{ color: 'white', margin: 0 }}>
          📋 Task Manager
        </Title>
        
        {/* Search Bar in Header */}
        <Search
          placeholder="Search tasks by name..."
          allowClear
          enterButton={<SearchOutlined />}
          size="large"
          style={{ width: 400 }}
          value={searchTerm}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
          onSearch={handleSearch}
        />
      </Header>

      {/* Main Content Section */}
      <Content style={{ padding: '50px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          
          {/* Action Buttons */}
          <Space style={{ marginBottom: 24 }}>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              size="large"
              onClick={() => setIsModalVisible(true)}
            >
              Create New Task
            </Button>
            <Button
              icon={<ReloadOutlined />}
              size="large"
              onClick={loadTasks}
            >
              Refresh
            </Button>
          </Space>

          {/* Loading Spinner */}
          {loading ? (
            <div style={{ textAlign: 'center', padding: '50px' }}>
              <Spin size="large" />
              <p style={{ marginTop: 16, color: '#666' }}>Loading tasks...</p>
            </div>
          ) : tasks.length === 0 ? (
            // Empty State - shown when no tasks exist
            <Empty
              description="No tasks found. Create your first task!"
              style={{ marginTop: 50 }}
            />
          ) : (
            // Task Cards - map over tasks array and render a card for each
            <Space direction="vertical" size="large" style={{ width: '100%' }}>
              {tasks.map((task) => (
                <TaskCard
                  key={task.id} // Unique key for React's rendering optimization
                  task={task}
                  onEdit={() => setEditingTask(task)}
                  onDelete={() => handleDelete(task.id)}
                  onExecute={() => handleExecute(task.id)}
                  onViewHistory={() => setHistoryTask(task)}
                />
              ))}
            </Space>
          )}
        </div>
      </Content>

      {/* Create Task Modal */}
      <TaskForm
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onSubmit={handleCreate}
        title="Create New Task"
      />

      {/* Edit Task Modal */}
      <TaskForm
        visible={!!editingTask} // !! converts to boolean
        onCancel={() => setEditingTask(null)}
        onSubmit={handleUpdate}
        initialValues={editingTask || undefined}
        title="Edit Task"
      />

      {/* Execution History Drawer */}
      <ExecutionHistory
        visible={!!historyTask}
        task={historyTask}
        onClose={() => setHistoryTask(null)}
      />
    </Layout>
  );
};

export default TaskList;
