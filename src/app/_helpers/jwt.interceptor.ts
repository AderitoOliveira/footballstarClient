import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { JwtHelperService } from "@auth0/angular-jwt";

import { environment } from '@environments/environment';
import { AuthenticationService } from '@app/_services/authentication.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService, private router: Router, private jwthelper: JwtHelperService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add auth header with jwt if user is logged in and request is to api url
        /* const currentUser = this.authenticationService.currentUserValue;
        const isLoggedIn = currentUser && currentUser.token;
        const isApiUrl = request.url.startsWith(environment.apiUrl);
        if (isLoggedIn && isApiUrl) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${currentUser.token}`
                }
            });
        }

        return next.handle(request); */
        if(this.authenticationService.currentUserValue) {
            const currentUserToken = this.authenticationService.currentUserValue.token;
            //const helper = new JwtHelperService();
            const isExpired = this.jwthelper.isTokenExpired(currentUserToken);
            //console.log(this.jwthelper.getTokenExpirationDate(currentUserToken));

            if(isExpired == false) {
                return next.handle(request);
            } else {
                this.authenticationService.logout();
                this.router.navigate(['']);
                return next.handle(request);
            }
        } else {
            return next.handle(request);
        }
        

    }
}