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
  completed?: boolean; 

   constructor(
     title: string, 
     status: 'todo' | 'in_progress' | 'done' = 'todo',
     description?: string, 
     dueDate?: Date,
    reminder: boolean = false, // Valeur par défaut
    completed: boolean = false
   ) {
   this.title = title;
   this.status = status;
  this.description = description;
  this.reminder = reminder;
  this.completed = completed;
   this.dueDate = dueDate;
   this.createdAt = new Date();
   this.updatedAt =  new Date();
   }
 }

