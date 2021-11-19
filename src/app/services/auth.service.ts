import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { format, parseJSON, isFuture } from 'date-fns';

export class CreateUserDto {
  email: string;
  firstname: string;
  lastname: string;
  password: string;
}

export class LoginDto {
  email: string;
  password: string;
}

export interface User {
  id: number;
  email: string;
  firstname: string;
  lastname: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiBase = `${environment.apiBase}/authentication`;

  constructor(private http: HttpClient) {}

  register(registerDto: CreateUserDto): Observable<User> {
    const url = `${this.apiBase}/register`;
    return this.http.post<User>(url, registerDto);
  }

  login(loginData: LoginDto): Observable<User> {
    const url = `${this.apiBase}/log-in`;
    return this.http.post<User>(url, loginData);
  }

  public isLoggedIn() {
    return isFuture(this.getExpiration());
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }

  getExpiration() {
    const expiration = localStorage.getItem('expires_at');
    return parseJSON(expiration);
  }
}
