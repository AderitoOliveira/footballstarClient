import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';


import { AuthenticationService } from './../_services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';
  public email: string = ''; 
  public password: string = '';
  login_error : boolean;
  error_message : string;

  constructor(private route: ActivatedRoute, private router: Router, private authenticationService: AuthenticationService) {
      // redirect to home if already logged in
      if (this.authenticationService.currentUserValue) { 
        this.router.navigate(['/player']);
      }
   }
  
  ngOnInit() {
    //this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/player';
  }

  /* onLoginClick(email, password){
    console.log(email + " --> " + password);
    this.router.navigate(['./player']);
  } */

  onLoginClick(email, password){
    this.submitted = true;

    // stop here if form is invalid
    /* if (this.loginForm.invalid) {
        return;
    } */

    this.loading = true;
    this.authenticationService.login(email, password)
        .pipe(first())
        .subscribe(
            data => {
              if(this.authenticationService.getAuthenticationErroMessageValue == true) {
                this.login_error = true;
                this.error_message = 'Erro ao autenticar. Verifique se o email e password estão correctos';
                this.authenticationService.clearAuthenticationErroMessage();
               } else {
                if(this.authenticationService.currentUserValue.role == 'Admin') {
                  this.router.navigate(['/admin']);
                 }
                 if(this.authenticationService.currentUserValue.role == 'Player') {
                  this.router.navigate(['/player']);
                 }
               }
            },
            error => {
                this.error = error;
                this.loading = false;
            });
  }

}
