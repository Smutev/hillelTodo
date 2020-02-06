import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {AuthResponse, User} from '../../../shared/interfaces';
import {Observable, throwError} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';

@Injectable()
export class AuthService {
    constructor(private http: HttpClient) {}

    get token(): string {
        return localStorage.getItem('token');
    }

    login(user: User): Observable<any> {
       return this.http.post('https://todo.hillel.it/auth/login', user)
           .pipe(
               tap(this.setToken),
           );
    }

    logout() {
        this.setToken(null);
    }

    isAuthenticated(): boolean {
        return !!this.token;
    }

    private setToken(response: AuthResponse | null) {
        if (response) {
            localStorage.setItem('token', response.access_token);
        } else {
            localStorage.clear();
        }
    }
}
