import { Component, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';

import { AuthenticationService } from './../_services/authentication.service';
import { User } from '@app/_models/user';

import { VideoService } from './video.service';
import { GlobalCommunicationService } from '../_helpers/globalcommunicationservice';

const URL       = 'http://localhost:3000/api/upload/';
const URL_BASE  = 'http://localhost:3000/video/';

@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.scss'],
  providers: [VideoService]
})
export class VideosComponent implements OnInit {

  videos : any = [];
  private user : User;
  private player_id : number;

  public uploader: FileUploader = new FileUploader({
    itemAlias: 'image'
  });

  constructor(private authenticationService: AuthenticationService, private videoService : VideoService,private globalCommunictionService: GlobalCommunicationService) { 
    this.user       = authenticationService.currentUserValue;
    this.player_id  = authenticationService.currentUserValue.player_id;
    console.log("Video Component User: " + this.user.player_id);
  }

  ngOnInit() {

    this.globalCommunictionService.changeData("Os meus Vídeos");

    this.uploader.onBeforeUploadItem = (item: any) => {
      item.url = 'http://localhost:3000/api/upload/' + this.player_id;
    }

    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
    };
    this.uploader.onCompleteItem = (item: any, status: any) => {
      if(JSON.parse(status).success == true) {
        console.log('Uploaded File Details:', item);
        this.videoService.uploadVideoInfoToDatabase(this.player_id, item._file.name);
        let video_structure = {
          video_path  : URL_BASE + this.player_id + '/' + item._file.name,
          video_name  : item._file.name
        }
  
        this.videos.push(video_structure);
        //location.reload();
      }
    };

    this.getAllPlayerVideos(this.player_id);

  }

  getAllPlayerVideos(player_id : number) : any {
    this.videoService.getVideosOfPlayer(player_id).subscribe(data=> {
    console.log(data); 
    for(let i=0; i < data.length; i++) {
      let player_id   = data[i].PLAYER_ID;
      let file_name  = data[i].FILE_NAME;
      console.log("XPTO: " + data[i]);

      let video_structure = {
        video_path  : URL_BASE + player_id + '/' + file_name,
        video_name  : file_name
      }

      this.videos.push(video_structure);
      //this.videos.push(URL_BASE + player_id + '/' + file_name);
    }

    });
  }



}
