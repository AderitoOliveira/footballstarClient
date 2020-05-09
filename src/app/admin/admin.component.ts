import { Component, OnInit } from '@angular/core';

import { User } from './../_models/user';
import { AuthenticationService } from './../_services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  messageOfTheRoute : string;
  loading = false;
  currentUser : User;
  userFromApi : User;
  firstName   : string;
  lastName    : string;

  constructor(private authenticationService: AuthenticationService, private router: Router) { 
    this.currentUser = this.authenticationService.currentUserValue;
      this.firstName   = this.currentUser.firstName;
      this.lastName   = this.currentUser.lastName;
  }

  ngOnInit() {
  }

  onActivate(event) {
    window.scroll(0,0);
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['']);
  }

}
