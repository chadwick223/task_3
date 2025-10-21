# 📋 Task Manager - Frontend

A modern, full-featured task management application built with React, TypeScript, and Ant Design. This application allows users to create, manage, execute, and track command-line tasks with real-time validation and execution history.

![React](https://img.shields.io/badge/React-19.0.0-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-4.x-blue)
![Ant Design](https://img.shields.io/badge/Ant%20Design-5.27.5-1890ff)
![Axios](https://img.shields.io/badge/Axios-1.12.2-purple)


Core Functionality
- ✅ **Task Management**: Create, read, update, and delete tasks
- ✅ **Command Execution**: Execute shell commands directly from the UI
- ✅ **Execution History**: Track all task executions with timestamps and outputs
- ✅ **Real-time Validation**: Validate commands before execution to prevent dangerous operations
- ✅ **Search Functionality**: Search tasks by name or ID
- ✅ **Responsive Design**: Beautiful UI that works on all screen sizes

Advanced Features
- 🔍 **Dual Search**: Search by task name or task ID
- ⚠️ **Command Validation**: Real-time validation warns users about potentially dangerous commands
- 📊 **Execution Tracking**: View complete execution history with exit codes and error messages
- 🎨 **Modern UI**: Built with Ant Design for a professional look and feel
- 🔄 **Auto-refresh**: Real-time updates when tasks are modified

 Tech Stack

| Technology | Version | Purpose |

|------------|---------|---------|

| React | 19.0.0 | UI Framework |

| TypeScript | 4.x | Type Safety |

| Ant Design | 5.27.5 | UI Component Library |

| Axios | 1.12.2 | HTTP Client |

| React Scripts | 5.0.1 | Build Tool |

📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: Version 14.x or higher
- **npm**: Version 6.x or higher (comes with Node.js)
- **Git**: For cloning the repository
- **Backend API**: The Spring Boot backend must be running on `http://localhost:8082`

project structure
src/

├── component/ # React components

│ ├── tasklist.tsx # Main list view

│ ├── taskcard.tsx # Task display

│ ├── taskform.tsx # Create/Edit form

│ └── history.tsx # Execution history

├── services/ # API services

│ └── taskservice.ts # All API calls

├── types/ # TypeScript types

│ └── task.types.ts # Type definitions

├── App.tsx # Root component

└── index.tsx # Entry poin

<img width="1918" height="1078" alt="image" src="https://github.com/user-attachments/assets/4989d581-3f7c-495d-a919-eac7a40414c5" />



<img width="1918" height="1078" alt="image" src="https://github.com/user-attachments/assets/3d6dc212-2cd9-430e-97a1-173844608201" />




### Searching
- **By ID**: Select "By ID", paste task ID

<img width="1918" height="1078" alt="image" src="https://github.com/user-attachments/assets/cb4b2e1d-4404-4ec2-8ba3-a9f64d40d4fb" />




### Creating a Task
1. Click "Create New Task"
2. Fill in name, owner, and command
3. Submit (validation runs automatically)

<img width="1918" height="1078" alt="image" src="https://github.com/user-attachments/assets/36863f7d-29f6-4c60-b8bd-20666c157e6c" />



<img width="1919" height="1077" alt="create_newtask_frontend" src="https://github.com/user-attachments/assets/1f27d68c-ae9d-4099-803a-8d6a6d2596ff" />



delete task
1) click the delete icon

<img width="1918" height="1078" alt="image" src="https://github.com/user-attachments/assets/73daaa26-f7e3-4d33-96a1-d019d4620f34" />


<img width="1919" height="1079" alt="deletetaskfrontend" src="https://github.com/user-attachments/assets/6dbd6afd-d1ad-456d-bdd0-c5ea74a416ec" />

update task
1) click the edit icon

<img width="1917" height="1078" alt="image" src="https://github.com/user-attachments/assets/f8cc4750-2ecb-492a-8737-1f9822ad28f5" />

<img width="1919" height="1079" alt="editedtaskfrontend" src="https://github.com/user-attachments/assets/218b2a6c-9283-4b46-9b72-49e7ef011f85" />


### Executing a Task
1. Click green "Execute" button
2. View results in history

<img width="1918" height="1077" alt="image" src="https://github.com/user-attachments/assets/b818477e-13d8-4dad-950e-8b469027cc60" />


<img width="1919" height="1079" alt="execution_taskfrontend" src="https://github.com/user-attachments/assets/57e11ea7-852a-4589-920e-d2f4938289a8" />


get all task
screen automatically loads get all task
<img width="1919" height="1079" alt="get all task frontend" src="https://github.com/user-attachments/assets/544ab922-4514-487e-8228-d3b86d63de3b" />


### Searching
- **By Name**: Select "By Name", type task name


<img width="1918" height="1078" alt="image" src="https://github.com/user-attachments/assets/c29062f0-00a8-4452-92b8-35268c29bff2" />



