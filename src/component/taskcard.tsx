import React from 'react';
// Remove Card import, keep others needed
import { Button, Space, Tag, Tooltip, Typography } from 'antd';
import {
  EditOutlined,
  DeleteOutlined,
  PlayCircleOutlined,
  HistoryOutlined,
  UserOutlined,
  CodeOutlined,
} from '@ant-design/icons';
import { Task } from '../types/task.types'; // Make sure path is correct

const { Text } = Typography;

// Props interface remains the same
interface TaskCardProps {
  task: Task;
  onEdit: () => void;
  onDelete: () => void;
  onExecute: () => void;
  onViewHistory: () => void;
}

const TaskCard: React.FC<TaskCardProps> = ({
  task,
  onEdit,
  onDelete,
  onExecute,
  onViewHistory,
}) => {
  const executionCount = task.taskexecutions?.length || 0;

  // --- Card Styling (Inline Styles) ---
  const cardStyle: React.CSSProperties = {
    border: '1px solid #f0f0f0', // Light border
    borderRadius: '8px',       // Rounded corners
    padding: '20px 24px 8px 24px', // Internal padding (reduced bottom for actions)
    marginBottom: '16px',      // Space below card
    backgroundColor: '#ffffff', // White background
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.09)', // Subtle shadow
    display: 'flex',
    flexDirection: 'column',
  };

  const actionsStyle: React.CSSProperties = {
    marginTop: '12px',
    paddingTop: '12px',
    borderTop: '1px solid #f0f0f0', // Separator line
    display: 'flex',
    justifyContent: 'space-around', // Distribute actions evenly
  };

  const actionButtonStyle: React.CSSProperties = {
    padding: '0 8px', // Adjust padding for text buttons
  };
  // --- End Card Styling ---

  return (
    // Use a div with inline styles instead of <Card>
    <div style={cardStyle}>
      {/* Card Title Area (replaces Card.Meta) */}
      <div style={{ marginBottom: '16px' }}>
         <Space>
           <Text strong style={{ fontSize: 18 }}>
             {task.name}
           </Text>
           {executionCount > 0 && (
             <Tag color="green">{executionCount} executions</Tag>
           )}
         </Space>
      </div>

      {/* Card Content Area */}
      <div style={{ flexGrow: 1 }}> {/* Allow content to grow */}
        <Space direction="vertical" size="small" style={{ width: '100%' }}>
          {/* Owner */}
          <div>
            <UserOutlined style={{ marginRight: 8, color: '#1890ff' }} />
            <Text type="secondary">Owner: </Text>
            <Text strong>{task.owner}</Text>
          </div>

          {/* Command */}
          <div>
            <CodeOutlined style={{ marginRight: 8, color: '#1890ff' }} />
            <Text type="secondary">Command: </Text>
            <Tag color="blue" style={{ fontFamily: 'monospace' }}>
              {task.command}
            </Tag>
          </div>

          {/* Task ID (for reference) */}
          <div>
            <Text type="secondary" style={{ fontSize: 12 }}>
              ID: {task.id}
            </Text>
          </div>
        </Space>
      </div>

       {/* Actions Area (replaces Card actions prop) */}
      <div style={actionsStyle}>
        <Tooltip title="Execute Task">
          <Button
            type="text"
            icon={<PlayCircleOutlined />}
            onClick={onExecute}
            style={{ ...actionButtonStyle, color: '#52c41a' }}
          >
            Execute
          </Button>
        </Tooltip>

        <Tooltip title="Edit Task">
          <Button type="text" icon={<EditOutlined />} onClick={onEdit} style={actionButtonStyle}>
            Edit
          </Button>
        </Tooltip>

        <Tooltip title="View Execution History">
          <Button
            type="text"
            icon={<HistoryOutlined />}
            onClick={onViewHistory}
            disabled={executionCount === 0}
            style={actionButtonStyle}
          >
            History ({executionCount})
          </Button>
        </Tooltip>

        <Tooltip title="Delete Task">
          <Button
            type="text"
            danger
            icon={<DeleteOutlined />}
            onClick={onDelete}
            style={actionButtonStyle}
          >
            Delete
          </Button>
        </Tooltip>
      </div>
    </div> // End of Card div
  );
};

export default TaskCard;