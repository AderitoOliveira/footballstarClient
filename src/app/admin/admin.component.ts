import { Component, OnInit } from '@angular/core';

import { AuthenticationService } from './../_services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  messageOfTheRoute : string;

  constructor(private authenticationService: AuthenticationService, private router: Router) { 
    
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
