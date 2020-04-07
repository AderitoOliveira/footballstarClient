import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class VideoService {
 
    httpdata = <any>{};

    constructor(private httpClient: HttpClient) { }
   
    getVideosOfPlayer(player_id : number): any {
      
        console.log("Inside getViedosOfPlayer");

        return this.httpClient.get('http://localhost:3000/allVideosOfPlayer/' + player_id).pipe(map((res:any) => res)) 
    }

    uploadVideoInfoToDatabase(player_id : number, file_name : string) {
        //this.httpClient.post('http://localhost:3000/insertVideoInfoToDatabase', { player_id, filename }).pipe(map((res:any) => res)) 

        this.httpClient.post('http://localhost:3000/insertVideoInfoToDatabase', { player_id, file_name }).subscribe({
        //next: data => this.postId = data.id,
        error: error => console.error('There was an error!', error)
})
    }
}