import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { GlobalCommunicationService } from '../../_helpers/globalcommunicationservice';

import { ValidateExerciseService } from './validateexercise.service';

@Component({
  selector: 'app-validateexercise',
  templateUrl: './validateexercise.component.html',
  styleUrls: ['./validateexercise.component.scss'],
  providers: [ValidateExerciseService]
})
export class ValidateexerciseComponent implements OnInit {

  selected_exercise_level : string = 'Nivel 1';
  number_of_exercise_levels : string[];
  exercise_videos_to_review = [];
  final_videos = [];

  constructor(private validateExerciseService : ValidateExerciseService, private globalCommunictionService: GlobalCommunicationService,
              private router: Router, private activatedRoute: ActivatedRoute) { 

  }

  ngOnInit() {
    this.getAllExerciseLevels();
    this.validateExerciseService.getVideosOfLevelToReview(1).subscribe(data=> {
      console.log(data); 
      this.exercise_videos_to_review = data;
    });
  }

  getAllExerciseLevels() : any {
    this.validateExerciseService.getAllExercise().subscribe(data=> {
    console.log("getAllExerciseLevels");
    console.log(data); 
    this.number_of_exercise_levels = data;
    });
  }
  
  getExercisesToValidate(exercise_level : number, exercise_level_name : string) {
    this.selected_exercise_level = exercise_level_name;
    this.validateExerciseService.getVideosOfLevelToReview(exercise_level + 1).subscribe(data=> {
      console.log(data); 
      this.exercise_videos_to_review = data;
    });

  }

  goToExerciseValidationDetail() {
    console.log('Button clicked');
    let detailData = {
      /* video_path      : video_path,
      exercise_level  : exercise_level,
      exercise_number : exercise_number,
      exercise_id     : exercise_id */
    }

    this.globalCommunictionService.changeDataExchange(detailData);
    this.router.navigate(['admin','validate_exercise_detail']);
  }
}
