import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TaskList } from '../models/task-list.model';

@Injectable({
  providedIn: 'root',
})
export class ListService {
  private apiUrl = 'http://localhost:3000/api/lists'; // adapte si ton backend a une autre URL

  constructor(private http: HttpClient) {}

  getLists(): Observable<TaskList[]> {
    return this.http.get<TaskList[]>(this.apiUrl);
  }

  addList(list: Partial<TaskList>): Observable<TaskList> {
    return this.http.post<TaskList>(this.apiUrl, list);
  }

  updateList(list: TaskList): Observable<TaskList> {
    return this.http.put<TaskList>(`${this.apiUrl}/${list._id}`, list);
  }

  deleteList(_id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${_id}`);
  }
}
