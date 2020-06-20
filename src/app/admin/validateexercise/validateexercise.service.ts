import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '@environments/environment';

@Injectable()
export class ValidateExerciseService {
 
    httpdata = <any>{};

    constructor(private httpClient: HttpClient) { }

    getAllExercise(): any {
      
        console.log("Inside getAllExerciselevels");

        return this.httpClient.get(`${environment.apiUrl}/getAllExerciseLevels/`).pipe(map((res:any) => res)) 
    }
    
    getVideosOfLevelToReview(exercise_level : number): any {
      
        console.log("Inside getVideosOfLevelToReview");

        let params = new HttpParams();
        params = params.append('exercise_level', '' + exercise_level);

        return this.httpClient.get(`${environment.apiUrl}/getVideosFromLevelToReview/`, { params: params }).pipe(map((res:any) => res)) 
    }
}