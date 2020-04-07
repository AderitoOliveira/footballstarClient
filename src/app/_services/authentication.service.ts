import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, retry } from 'rxjs/operators';
import * as moment from "moment";

import { environment } from '@environments/environment';
import { User, UserAuthentication } from '@app/_models/user';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;
    public user : User;
    private error_message: boolean;
    //public error_message : boolean;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
        this.error_message = false;
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    public clearAuthenticationErroMessage() {
        this.error_message = false;
    }

    public get getAuthenticationErroMessageValue() : boolean {
        return this.error_message;
    }


    login(username: string, password: string) {
            return this.http.post<UserAuthentication>('http://localhost:3000/authenticate', { username, password }).pipe(retry(3),map((response) => 
                    {
                        if(response.auth_message == 'Error') {
                            
                            console.log(response)
                            this.error_message = true;

                        } else {
                            console.log(response),
                            this.user = response.user,
                            // store user details and jwt token in local storage to keep user logged in between page refreshes
                            localStorage.setItem('currentUser', JSON.stringify(this.user)),
                            this.currentUserSubject.next(response.user)
                        }
                        
                    }
            ))
    }

    private setSession(authResult) {
        const expiresAt = moment().add(authResult.expiresIn,'second');

        localStorage.setItem('id_token', authResult.idToken);
        localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()) );
    }  


    logout() {
        localStorage.removeItem("currentUser");
        localStorage.removeItem("expires_at");
        this.currentUserSubject.next(null);
    }

    public isLoggedIn() {
        return moment().isBefore(this.getExpiration());
    }

    isLoggedOut() {
        return !this.isLoggedIn();
    }

    getExpiration() {
        const expiration = localStorage.getItem("expires_at");
        const expiresAt = JSON.parse(expiration);
        return moment(expiresAt);
    }    
}