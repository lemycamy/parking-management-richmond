import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Router } from '@angular/router';

interface JwtPayload {
  sub: number;
  username: string;
  role: 'admin' | 'user';
  exp: number;
}

@Injectable({
  providedIn: 'root',
})

export class AuthService {
  private readonly TOKEN_KEY = 'sex-sex-iyot';

  private http = inject(HttpClient);
  private router = inject(Router);
  private baseUrl = environment.apiBaseUrl;

  setToken(token: string) {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  logout() {
    localStorage.removeItem(this.TOKEN_KEY);
    this.router.navigate(['/login']);
  }

  getPayload(): JwtPayload | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      const payload = token.split('.')[1];
      return JSON.parse(atob(payload));
    } catch {
      return null;
    }
  }

  getRole(): 'admin' | 'user' | null {
    return this.getPayload()?.role ?? null;
  }

  isLoggedIn(): boolean {
    const payload = this.getPayload();
    if (!payload) return false;
    return payload.exp * 1000 > Date.now();
  }

  login(payload: { username: string, password: string }) {
    return this.http.post(`${this.baseUrl}/auth/login`, payload)
  }
}
