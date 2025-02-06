import { Injectable } from '@angular/core';
import { Task } from '../models/Task';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private showAddTask: boolean = false;
  private subject = new Subject<any>();
  private tasks: Task[] = [];
  constructor() {}

  // Ajouter une tâche avec ou sans rappel
addTask(title: string, description?: string, dueDate?: Date): Task {
  const newTask = new Task(title, 'todo', description, dueDate);
  newTask.id = this.tasks.length+1;  //// Simuler un ID auto-incrémenté
  this.tasks.push(newTask);
  return newTask;
}
 // Récupérer toutes les tâches 
 getTasks(): Task[] {
  return this.tasks;
 }
 // Mettre à jours le statut d'une tâche 
/*updateTask(id: number, status?: 'todo' | 'in_progress' | 'done'): void  {
  const task = this.tasks.find(t => t.id === id);
  if(task) {
    if (status) task.status = status;
    if (reminder !== undefined) task.reminder = reminder;
    task.updatedAt = new Date();
  }
 }*/
  updateTask(id: number, status?: 'todo' | 'in_progress' | 'done', reminder?: boolean) {
    // Implémentation ici...
    const task = this.tasks.find(t => t.id === id); 
    if(task) {
      if (status) task.status = status;
      if (reminder !== undefined) task.reminder = reminder;
      task.updatedAt = new Date();
    }
  }

 // Supprimer une tâche
 deleteTask(id: number): void {
  this.tasks =  this.tasks.filter(t => t.id !== id);
 }
 toggleAddTask(): void {
  this.showAddTask = !this.showAddTask;
  this.subject.next(this.showAddTask);
}
}
