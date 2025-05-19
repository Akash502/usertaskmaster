// src/app/auth/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/users';  // Mock API endpoint
  private jwtHelper = new JwtHelperService();

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, { username, password });
  }

    // Register user
  register(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, { username, password });
  }

  getToken() {
    return localStorage.getItem('token'); 
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    if (token) {
      try {
        const tokenParts = token.split('.');
        if (tokenParts.length === 3) {
          const decoded: any = jwtDecode(token);
          if (decoded.exp && decoded.exp < Date.now() / 1000) {
            return false;
          }
          return true;
        } else {
          console.error('Invalid JWT format:', token);
          return false;
        }
      } catch (error) {
        console.error('Error decoding JWT:', error);
        return false;
      }
    }
    return false;
  }


  logout(): void {
    localStorage.removeItem('token');
  }
}
