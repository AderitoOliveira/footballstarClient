import { Injectable } from '@angular/core';
import { HttpClient , HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';
import { map } from 'rxjs/operators';

import { Role } from '@app/_models/role';
import { User } from '@app/_models/user';

const users: User[] = [
    { player_id: 1, email: 'admin', password: 'admin', firstName: 'Admin', lastName: 'User', role: Role.Admin },
    { player_id: 2, email: 'user', password: 'user', firstName: 'Normal', lastName: 'User', role: Role.Player }
];

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {

    constructor(public http: HttpClient) {
    }

     
    public login(credentials) { 
        return this.http.post('localhost:3000/authenticate', credentials).pipe(map(response => {
           //let result = response.json();
           let result = response;
           if (result && result) {
             //localStorage.setItem('token', result.token);
             localStorage.setItem('token', "");
     
             //let jwt = new JwtHelper();
             //this.currentUser = jwt.decodeToken(localStorage.getItem('token'));
     
             return true; 
           }
           else return false; 
         }));
       };
    
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const { url, method, headers, body } = request;

        // wrap in delayed observable to simulate server api call
        return of(null)
            .pipe(mergeMap(handleRoute))
            .pipe(materialize()) // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648)
            .pipe(delay(500))
            .pipe(dematerialize());

        function handleRoute() {
            switch (true) {
                case url.endsWith('/users/authenticate') && method === 'POST':
                    return authenticate();
                case url.endsWith('/users') && method === 'GET':
                    return getUsers();
                case url.match(/\/users\/\d+$/) && method === 'GET':
                    return getUserById();
                default:
                    // pass through any requests not handled above
                    return next.handle(request);
            }

        }

        // route function

        function authenticate() {
            const { username, password } = body;
            const user = users.find(x => x.email === username && x.password === password);
            this.login(body);
            if (!user) return error('Username or password is incorrect');
            return ok({
                id: user.player_id,
                username: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                role: user.role,
                token: `fake-jwt-token.${user.player_id}`
            });
        }


        function getUsers() {
            if (!isAdmin()) return unauthorized();
            return ok(users);
        }

        function getUserById() {
            if (!isLoggedIn()) return unauthorized();

            // only admins can access other user records
            if (!isAdmin() && currentUser().player_id !== idFromUrl()) return unauthorized();

            const user = users.find(x => x.player_id === idFromUrl());
            return ok(user);
        }

        // helper functions

        function ok(body) {
            return of(new HttpResponse({ status: 200, body }));
        }

        function unauthorized() {
            return throwError({ status: 401, error: { message: 'unauthorized' } });
        }

        function error(message) {
            return throwError({ status: 400, error: { message } });
        }

        function isLoggedIn() {
            const authHeader = headers.get('Authorization') || '';
            return authHeader.startsWith('Bearer fake-jwt-token');
        }

        function isAdmin() {
            return isLoggedIn() && currentUser().role === Role.Admin;
        }

        function currentUser() {
            if (!isLoggedIn()) return;
            const id = parseInt(headers.get('Authorization').split('.')[1]);
            return users.find(x => x.player_id === id);
        }

        function idFromUrl() {
            const urlParts = url.split('/');
            return parseInt(urlParts[urlParts.length - 1]);
        }
    }

    /* login(credentials) { 
        return this.http.post('localhost:3000/authenticate', credentials).pipe(map(response => {
           let result = response.json();
           if (result && result.token) {
             localStorage.setItem('token', result.token);
     
             //let jwt = new JwtHelper();
             //this.currentUser = jwt.decodeToken(localStorage.getItem('token'));
     
             return true; 
           }
           else return false; 
         }));
       } */
}

export const fakeBackendProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackendInterceptor,
    multi: true
};