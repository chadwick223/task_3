import React from 'react';
// Remove Card import
import {
  Drawer,
  Timeline,
  Typography,
  Empty,
  Tag,
  Divider,
  Space,
} from 'antd';
import {
  ClockCircleOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
} from '@ant-design/icons';
import { Task } from '../types/task.types'; // Make sure path is correct

const { Title, Text, Paragraph } = Typography;

interface ExecutionHistoryProps {
  visible: boolean;
  task: Task | null;
  onClose: () => void;
}

// --- Inline Styles (Similar to Card) ---
const infoBoxStyle: React.CSSProperties = {
  border: '1px solid #f0f0f0',
  borderRadius: '8px',
  padding: '12px 16px', // Smaller padding for info box
  marginBottom: '24px',
  backgroundColor: '#ffffff',
};

const executionItemStyle: React.CSSProperties = {
  border: '1px solid #f0f0f0',
  borderRadius: '8px',
  marginBottom: '16px', // Add margin below each execution item
  // No padding here, padding will be added to header/content divs
};

const executionHeaderStyle: React.CSSProperties = {
  padding: '12px 16px',
  borderBottom: '1px solid #f0f0f0',
  backgroundColor: '#fafafa', // Light header background
};

const executionContentStyle: React.CSSProperties = {
  padding: '12px 16px',
};

const outputBoxStyle: React.CSSProperties = {
  marginTop: 8,
  background: '#262626', // Darker background for output
  color: '#bae637', // Light green text color
  fontFamily: 'monospace',
  fontSize: 12,
  padding: '10px', // Padding inside the output box
  borderRadius: '4px',
  maxHeight: 250, // Increased max height
  overflow: 'auto',
  whiteSpace: 'pre-wrap', // Ensure wrapping
  wordBreak: 'break-all', // Ensure breaking long words
};
// --- End Inline Styles ---

const ExecutionHistory: React.FC<ExecutionHistoryProps> = ({
  visible,
  task,
  onClose,
}) => {
  if (!task) return null;

  const executions = task.taskexecutions || [];

  const formatDateTime = (dateTimeString: string) => {
    // ... (keep your formatDateTime function)
    const date = new Date(dateTimeString);
    return date.toLocaleString('en-US', { /* ... options */ });
  };

  const calculateDuration = (start: string, end: string) => {
    // ... (keep your calculateDuration function)
     const startTime = new Date(start).getTime();
     const endTime = new Date(end).getTime();
     return ((endTime - startTime) / 1000).toFixed(2);
  };

  const isSuccess = (output: string) => {
    // ... (keep your isSuccess function)
    return !output.toLowerCase().includes('error') &&
           !output.includes('exit code:');
  };

  return (
    <Drawer
      title={
        <div>
          <Title level={4} style={{ margin: 0 }}>Execution History</Title>
          <Text type="secondary">{task.name}</Text>
        </div>
      }
      placement="right"
      width={720}
      open={visible}
      onClose={onClose}
    >
      {/* Task Information Box (replaces Card) */}
      <div style={infoBoxStyle}>
        <Space direction="vertical" size="small" style={{ width: '100%' }}>
          <div>
            <Text strong>Owner: </Text>
            <Text>{task.owner}</Text>
          </div>
          <div>
            <Text strong>Command: </Text>
            <Tag color="blue" style={{ fontFamily: 'monospace' }}>
              {task.command}
            </Tag>
          </div>
          <div>
            <Text strong>Total Executions: </Text>
            <Tag color="green">{executions.length}</Tag>
          </div>
        </Space>
      </div>

      <Divider>Execution Timeline</Divider>

      {executions.length === 0 ? (
        <Empty
          description="No executions yet. Click 'Execute' to run this task."
          image={Empty.PRESENTED_IMAGE_SIMPLE}
        />
      ) : (
        <Timeline
          mode="left"
          items={[...executions].reverse().map((execution, index) => {
            const success = isSuccess(execution.output);
            const executionNumber = executions.length - index;

            return {
              color: success ? 'green' : 'red',
              dot: success ? <CheckCircleOutlined /> : <CloseCircleOutlined />,
              children: (
                // Execution Item Box (replaces Card)
                <div style={executionItemStyle}>
                   {/* Execution Header */}
                  <div style={executionHeaderStyle}>
                    <Space>
                      <Text strong>Execution #{executionNumber}</Text>
                      <Tag color={success ? 'success' : 'error'}>
                        {success ? 'Success' : 'Failed'}
                      </Tag>
                    </Space>
                  </div>
                  {/* Execution Content */}
                  <div style={executionContentStyle}>
                    <Space direction="vertical" size="small" style={{ width: '100%' }}>
                      <div>
                        <ClockCircleOutlined style={{ marginRight: 8 }} />
                        <Text type="secondary">Started: </Text>
                        <Text>{formatDateTime(execution.startTime)}</Text>
                      </div>
                      <div>
                        <ClockCircleOutlined style={{ marginRight: 8 }} />
                        <Text type="secondary">Ended: </Text>
                        <Text>{formatDateTime(execution.endTime)}</Text>
                      </div>
                      <div>
                        <Text type="secondary">Duration: </Text>
                        <Tag color="blue">
                          {calculateDuration(execution.startTime, execution.endTime)}s
                        </Tag>
                      </div>
                      <Divider style={{ margin: '12px 0' }} />
                      <div>
                        <Text strong>Output:</Text>
                        {/* Output Box (replaces Card, uses <pre> inside) */}
                        <pre style={outputBoxStyle}>
                           {execution.output || 'No output'}
                        </pre>
                      </div>
                    </Space>
                  </div>
                </div> // End Execution Item Box
              ),
            };
          })}
        />
      )}
    </Drawer>
  );
};

export default ExecutionHistory;