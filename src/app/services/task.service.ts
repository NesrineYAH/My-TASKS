import { Injectable } from '@angular/core';
import { Task } from '../models/Task';
import { Observable, Subject, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private apiUrl = 'http://localhost:3000/api/tasks'; // adapte selon ton backend

  constructor(private http: HttpClient) {}

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl);
  }
  getTaskById(id: string): Observable<Task> {
    return this.http.get<Task>(`${this.apiUrl}/${id}`);
  }
  addTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.apiUrl, task);
  }

  // Nouvelle version de updateTask
updateTask(id: string, updates: Partial<Task>): Observable<Task> {
 return this.http.put<Task>(`${this.apiUrl}/${id}`, {
  ...updates,
  updatedAt: new Date(),
 });
}

  deleteTask(id: string): Observable<void>{
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  markTaskAsCompleted(id: string): Observable<Task> {
    return this.http.patch<Task>(`${this.apiUrl}/${id}`, { status: 'done' });
  }
  //29/05
  getTasksByListId(listId: string): Observable<Task[]> {
 return this.http.get<Task[]>(`/api/tasks/list/${listId}`);
  }

  uploadFile(taskId: string, file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post(`${this.apiUrl}/tasks/${taskId}/upload`, formData);
    
  }
}