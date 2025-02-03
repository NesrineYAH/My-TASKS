export class Task {
  id?: number;
  title?: string;
  description?: string;
  text?: string;
  day?: string;
  status?: 'todo' | 'in_progress' | 'done';
  dueDate?: Date;
  createdAt?: Date;
  updatedAt?: Date;
  reminder?: boolean;

  constructor(
    title: string, 
    status: 'todo' | 'in_progress' | 'done' = 'todo',
    description?: string, 
    dueDate?: Date,
    reminder: boolean = false // Valeur par défaut
  ) {
  this.title = title;
  this.status = status;
  this.description = description;
  this.dueDate = dueDate;
  this.createdAt = new Date();
  this.updatedAt =  new Date();
  }
}

