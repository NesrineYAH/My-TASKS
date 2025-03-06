import { Injectable } from '@angular/core';
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

