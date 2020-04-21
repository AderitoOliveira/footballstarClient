import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { GlobalCommunicationService } from '../_helpers/globalcommunicationservice';
import { excerciseDetailData} from '../_models/exercise_detail'

@Component({
  selector: 'app-exercises-detail',
  templateUrl: './exercises-detail.component.html',
  styleUrls: ['./exercises-detail.component.scss']
})
export class ExercisesDetailComponent implements OnInit {

  public video_path : string;
  public excercise_level : number;
  public dataFromParent : excerciseDetailData;


  constructor(private route: ActivatedRoute, private globalCommunicationService: GlobalCommunicationService) { 
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

    //this.globalCommunictionService.currentData.subscribe(message => this.video_path = message)
    this.globalCommunicationService.currentData.subscribe(data => {
            this.video_path = data.video_path;
            this.excercise_level = data.exercise_level
    });
    console.log(this.video_path);
    console.log(this.excercise_level);
  }

}
