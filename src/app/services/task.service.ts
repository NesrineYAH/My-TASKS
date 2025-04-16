import { Injectable } from '@angular/core';
import { Task } from '../models/Task';
import { Observable, Subject, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
//import { AuthService } from './auth.service';

/*const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};*/


@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private apiUrl = '/api/tasks';; // à adapter à ton URL backend

  constructor(private http: HttpClient) {}

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl);
  }

  getTaskById(id: number): Observable<Task> {
    return this.http.get<Task>(`${this.apiUrl}/${id}`);
  }

  addTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.apiUrl, task);
  }

  updateTask(id: number, updates: Partial<Pick<Task, 'status' | 'reminder'>>): Observable<Task> {
    const taskUpdate = { ...updates, updatedAt: new Date() };
    return this.http.put<Task>(`${this.apiUrl}/${id}`, taskUpdate);
  }

  deleteTask(id: number): Observable<void>{
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  markTaskAsCompleted(id: number): Observable<Task> {
    return this.http.patch<Task>(`${this.apiUrl}/${id}`, { status: 'done' });
  }
}