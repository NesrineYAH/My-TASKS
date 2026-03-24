import { Task } from './Task';

export interface Project {
  _id?: string;
  name: string;
  description: string;
  category: string,
  createdAt?: Date;
  tasks?: Task[]; 
}
