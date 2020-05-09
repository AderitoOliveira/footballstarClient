import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '@environments/environment';

@Injectable()
export class ExerciseDetailService {
 
    httpdata = <any>{};

    constructor(private httpClient: HttpClient) { }
    
    uploadVideoInfoToDatabase(player_id : number, file_name : string, exercise_level : number, exercise_number : number, exercise_id : number) {
        //this.httpClient.post('http://localhost:3000/insertVideoInfoToDatabase', { player_id, filename }).pipe(map((res:any) => res)) 

        this.httpClient.post(`${environment.apiUrl}/insertVideoInfoToDatabase`, { player_id, file_name, exercise_level,  exercise_number, exercise_id}).subscribe({
        //next: data => this.postId = data.id,
        error: error => console.error('There was an error!', error)
        })
    }
}