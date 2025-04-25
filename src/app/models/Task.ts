export class Task {
  id?: number;
  title: string;
  status: 'todo' | 'in_progress' | 'done';
  description?: string;
  priority?: 'low' | 'medium' | 'high';
  dueDate?: Date;
  reminder?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  category?: string;
  listId?: number; 

  constructor(
    title: string,
    status: 'todo' | 'in_progress' | 'done',
    description?: string,
    priority: 'low' | 'medium' | 'high' = 'medium',
    dueDate?: Date, 
    category?: string,
    listId?: number

  ) {
    this.title = title;
    this.status = status;
    this.description = description;
    this.priority = priority;
    this.dueDate = dueDate;
    this.category = category;
    this.createdAt = new Date();
    this.updatedAt = new Date();
    this.listId = listId;

  }
}
