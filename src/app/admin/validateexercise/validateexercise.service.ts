import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '@environments/environment';

@Injectable()
export class ValidateExerciseService {
 
    httpdata = <any>{};

    constructor(private httpClient: HttpClient) { }
    
    getVideosToReview(level_id : number, player_id : number): any {
      
        console.log("Inside getVideosOfExerciseLevel");

        let params = new HttpParams();
        params = params.append('level_id', '' +level_id);
        //params = params.append('player_id', '' + player_id);

        return this.httpClient.get(`${environment.apiUrl}/videosToReview/`, { params: params }).pipe(map((res:any) => res)) 
    }
}