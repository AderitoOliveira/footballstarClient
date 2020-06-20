import { Component, OnInit } from '@angular/core';

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

  constructor(private validateExerciseService : ValidateExerciseService) { 

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
}
