import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Post} from './interfaces';

@Injectable({
    providedIn: 'root'
})
export class PostService {
    constructor(private http: HttpClient){}

    create(post: Post): Observable<Post> {
        return this.http.post<Post>('https://todo.hillel.it/todo', post, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
    }

    getAll() {
        return this.http.get('https://todo.hillel.it/todo', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
    }

    getById(id: string): Observable<Post> {
        return this.http.get<Post>(`https://todo.hillel.it/todo/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
    }

    remove(id: string): Observable<void> {
        return this.http.delete<void>(`https://todo.hillel.it/todo/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
    }

    update(_id, priority, checked, value): Observable<Post> {
        return this.http.put<Post>(`https://todo.hillel.it/todo/${_id}`, {_id, priority, checked, value}, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
    }

    changeStatus(_id, priority, checked, value): Observable<Post> {
        return this.http.put<Post>(`https://todo.hillel.it/todo/${_id}/toggle`, {_id, priority, checked, value}, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
    }

}
