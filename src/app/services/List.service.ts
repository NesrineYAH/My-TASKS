// services/list.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface TaskList {
  id: number;
  name: string;
}

@Injectable({ providedIn: 'root' })
export class ListService {
 private apiUrl = 'http://localhost:3000/api/lists';

  constructor(private http: HttpClient) {}

  getLists(): Observable<TaskList[]> {
    return this.http.get<TaskList[]>(this.apiUrl);
  }
}
