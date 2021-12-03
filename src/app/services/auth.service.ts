import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { parseJSON, isFuture } from 'date-fns';
import { map } from 'rxjs/operators';
import { LoginUserDto } from '../shared/dtos/login-user.dto';

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
    return this.http.post<LoginUserDto>(url, loginData).pipe(
      map((authData) => {
        this.setSession(authData.access_token, authData.expiresIn);
        return authData.user;
      })
    );
  }

  private setSession(token, expiration) {
    const expiresIn = parseJSON(expiration);
    localStorage.setItem('id_token', token);
    localStorage.setItem('expiresIn', JSON.stringify(expiresIn.valueOf()));
  }

  public isLoggedOut() {
    return isFuture(this.getExpiration());
  }

  isLoggedIn() {
    return !this.isLoggedOut();
  }

  getExpiration() {
    const expiration = localStorage.getItem('expiresIn');
    return parseJSON(expiration);
  }

  logout() {
    localStorage.removeItem('id_token');
    localStorage.removeItem('expiresIn');
  }

  getToken() {
    return localStorage.getItem('id_token');
  }
}
