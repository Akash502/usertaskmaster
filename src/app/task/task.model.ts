export interface Task {
  id: number;                         // Unique task identifier
  title: string;                      // Task title
  description: string;                // Detailed description
  priority: 'Low' | 'Medium' | 'High';// Priority level
  dueDate: Date;                      // Due date
  status: 'To-Do' | 'In Progress' | 'Done'; // Current task status
  createdAt?: Date;                   // Optional: Creation timestamp
  updatedAt?: Date;                   // Optional: Last updateded Time timestamp
  color?: string;                 // Optional: color update the card color
}