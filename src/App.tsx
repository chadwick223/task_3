import React from 'react';
import { ConfigProvider } from 'antd';
import TaskList from './component/tasklist';
import './App.css';

// Main App Component
const App: React.FC = () => {
  return (
    // ConfigProvider allows global Ant Design configuration
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#1890ff', // Primary blue color
          borderRadius: 6,          // Rounded corners
        },
      }}
    >
      <TaskList />
    </ConfigProvider>
  );
};

export default App;
