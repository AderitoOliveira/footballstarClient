import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { GlobalCommunicationService } from '../_helpers/globalcommunicationservice';

@Component({
  selector: 'app-exercises-detail',
  templateUrl: './exercises-detail.component.html',
  styleUrls: ['./exercises-detail.component.scss']
})
export class ExercisesDetailComponent implements OnInit {

  private video_path : string;

  constructor(private route: ActivatedRoute, private globalCommunictionService: GlobalCommunicationService) { 
    /* this.route.params.subscribe( params => {
      console.log(params);
    });
 */
    this.route.queryParams.subscribe(params => {
      // Defaults to 0 if no query param provided.
      console.log(params);
    });
  }

  ngOnInit() {

    this.globalCommunictionService.currentData.subscribe(message => this.video_path = message)
  }

}
