import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';

import { User } from './../_models/user';
import { UserService } from './../_services/user.service';
import { AuthenticationService } from './../_services/authentication.service';
import { GlobalCommunicationService } from '../_helpers/globalcommunicationservice';


@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {

  loading = false;
  currentUser : User;
  userFromApi : User;
  firstName   : string;
  lastName    : string;
  messageOfTheRoute : string;

  constructor(private userService: UserService, private authenticationService: AuthenticationService, private globalCommunictionService: GlobalCommunicationService, private router: Router) { 
      this.currentUser = this.authenticationService.currentUserValue;
      this.firstName   = this.currentUser.firstName;
      this.lastName   = this.currentUser.lastName;
  }

  ngOnInit() {
    this.loading = true;
    /* this.userService.getById(this.currentUser.player_id).pipe(first()).subscribe(user => {
        this.loading = false;
        this.userFromApi = user;
    }); */
    this.globalCommunictionService.currentMessage.subscribe(message => this.messageOfTheRoute = message)
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['']);
  }

  onActivate(event) {
    /* let scrollToTop = window.setInterval(() => {
        let pos = window.pageYOffset;
        if (pos > 0) {
            window.scrollTo(0, pos - 20); // how far to scroll on each step
        } else {
            window.clearInterval(scrollToTop);
        }
    }, 16); */
    window.scroll(0,0);
  }

}
