import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '@environments/environment';

@Injectable()
export class ExerciseService {
 
    httpdata = <any>{};

    constructor(private httpClient: HttpClient) { }
   
    getVideosOfExerciseLevel(level_id : number): any {
      
        console.log("Inside getVideosOfExerciseLevel");

        return this.httpClient.get(`${environment.apiUrl}/getVideosOfExerciseLevel/`+ level_id).pipe(map((res:any) => res)) 
        //return this.httpClient.get('http://localhost:3000/getVideosOfExerciseLevel/' + level_id).pipe(map((res:any) => res)) 
    }

}