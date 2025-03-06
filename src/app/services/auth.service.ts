import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root' // Rend le service accessible partout dans l'application
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/auth';
  private authStatus = new BehaviorSubject<boolean>(this.hasToken());
  
  private authToken = '';
  private userId = '';

  constructor(private http: HttpClient,
             private router: Router) {}
             
 private hasToken(): boolean {
  return !!localStorage.getItem('token');
  }
             
 createUser(email: string, password: string) {
 return this.http.post<{ message: string }>('http://localhost:3000/api/auth/signup', {email: email, password: password});
 }           

getToken() {
  return this.authToken;
}
getUserId() {
  return this.userId;
}

loginUser(email: string, password: string):  Observable<any>  {
  return this.http.post<{ userId: string, token: string }>('http://localhost:3000/api/auth/login', {email: email, password: password}).pipe(
  tap(({userId, token }) => {
  this.userId =userId; 
  this.authToken = token;
  this.authStatus.next(true);
  })
);
};

logout() {
  this.authToken = '';
  this.userId = '';
  localStorage.removeItem('token'); // Supprime le token
  this.authStatus.next(false);
  this.router.navigate(['login']);
}
}
