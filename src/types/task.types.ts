export interface TaskExecution {
  startTime: string;
  endTime: string;
  output: string;
}

export interface Task {
  id: string;
  name: string;
  owner: string;
  command: string;
  taskexecutions: TaskExecution[];
}

export interface CreateTask {
  name: string;
  owner: string;
  command: string;
}

export interface UpdateTask {
  name: string;
  owner: string;
  command: string;
}
