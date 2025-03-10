/*import { Injectable } from '@angular/core';
import { Task } from '../models/Task';
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};


@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private showAddTask: boolean = false;
private subject = new Subject<any>();
  private tasks: Task[] = [];
  private apiUrl = 'http://localhost:3000/tasks';

  constructor(private http: HttpClient) {}


 // Récupérer toutes les tâches 
 getTasks(): Observable<Task[]> {
  return  this.http.get<Task[]>(this.apiUrl);
 }
//Pour une vraie mise à jour côté serveur, utilise plutôt :

updateTask(id: number, status?: 'todo' | 'in_progress' | 'done', reminder?: boolean): Observable<Task> {
  const taskUpdate = { status, reminder, updatedAt: new Date() };
  return this.http.put<Task>(`${this.apiUrl}/${id}`, taskUpdate, httpOptions);
}


 // Supprimer une tâche
 deleteTask(id: number): Observable<void> {
  const url = `${this.apiUrl}/${id}`;
  return this.http.delete<void>(url);
}

toggleAddTask(): void {
  this.showAddTask = !this.showAddTask;
  this.subject.next(this.showAddTask);
}

  // Ajouter une tâche avec ou sans rappel

    addTask(task: Task): Observable<Task> {
      return this.http.post<Task>(this.apiUrl, task, httpOptions);
    }
}
*/

import { Injectable } from '@angular/core';
import { Task } from '../models/Task';
import { Observable, Subject, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
//import { AuthService } from './auth.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};


@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private showAddTask: boolean = false;
  private subject = new Subject<boolean>();
  private apiUrl = 'http://localhost:3000/tasks';

  private tasks: Task[] = [
    { id: 1, title: 'Task 1', status: 'todo', reminder: false },
    { id: 2, title: 'Task 2', status: 'in_progress', reminder: true },
    { id: 3, title: 'Task 3', status: 'done', reminder: false }
  ];

  constructor(private http: HttpClient) {}
  //constructor( private http: HttpClient,   private auth: AuthService)) {}

  // Récupérer toutes les tâches
  getTasks(): Observable<Task[]> {
 return of([...this.tasks]);
   //    return  this.http.get<Task[]>(this.apiUrl);
  }

  // Mettre à jour une tâche
  updateTask(id: number, status?: 'todo' | 'in_progress' | 'done', reminder?: boolean): Observable<Task> {
    const taskUpdate = { status, reminder, updatedAt: new Date() };
    return this.http.put<Task>(`${this.apiUrl}/${id}`, taskUpdate, httpOptions);
   }
  // Supprimer une tâche
  deleteTask(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Ajouter une tâche
  addTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.apiUrl, task, httpOptions);
  }

  // Toggle de l'ajout de tâche
  toggleAddTask(): void {
    this.showAddTask = !this.showAddTask;
    this.subject.next(this.showAddTask);
  }

  getToggleState(): Observable<boolean> {
    return this.subject.asObservable();
  }
}
