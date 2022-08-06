import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from 'src/models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private user: User;

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-type': 'application/json',
      'Accept': 'application/json'
    })
  }

  constructor(private http: HttpClient) {
    this.user = JSON.parse((localStorage.getItem('user') as string))
      || {
        email: '',
        password: '',
        token: ''
      };
  }

  login(username: string, password: string): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(
      'https://assessment.farm21.com/api/login',
      { email: username, password: password },
      this.httpOptions
    )
  }

  logout(): Observable<{}> {
    return this.http.post(
      'https://assessment.farm21.com/api/logout',
      this.httpOptions
    )
  }

  setUser(token?: string, username?: string, password?: string, name?: string): void {
    if (token) this.user.token = token;
    if (username) this.user.email = username;
    if (password) this.user.password = password;
    if (name) this.user.name = name;
    localStorage.setItem('user', JSON.stringify(this.user));
  }

  getUser(): User {
    return this.user;
  }
}
