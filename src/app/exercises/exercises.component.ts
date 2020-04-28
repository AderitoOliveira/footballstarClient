import { Component, OnInit } from '@angular/core';
import { GlobalCommunicationService } from '../_helpers/globalcommunicationservice';
import { FileUploader, FileSelectDirective } from 'ng2-file-upload';
import { ExerciseService } from './exercises.service';
import { AuthenticationService } from './../_services/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';


const URL_BASE              = 'http://localhost:3000/exercisesVideo/';
const URL_BASE_UPLOAD       = 'http://localhost:3000/api/upload/';


@Component({
  selector: 'app-exercises',
  templateUrl: './exercises.component.html',
  styleUrls: ['./exercises.component.scss'],
  providers: [ExerciseService]
})
export class ExercisesComponent implements OnInit {

  videos : any = [];
  private player_id         : number;
  maxFileSize = 20 * 1024 * 1024; // modify this to your desired max file size

  public uploader: FileUploader = new FileUploader({
    itemAlias: 'image',
    maxFileSize:this.maxFileSize,
    removeAfterUpload : true,
  });

  constructor(private authenticationService: AuthenticationService, private exerciseService : ExerciseService, 
              private globalCommunictionService: GlobalCommunicationService, 
              private router: Router, private activatedRoute: ActivatedRoute) { 
    this.player_id  = authenticationService.currentUserValue.player_id;

  }

  ngOnInit() {
    this.globalCommunictionService.changeData("Exercícios a executar");

    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
    };

    this.uploader.onWhenAddingFileFailed = (item, filter) => {
      let message = '';
      switch (filter.name) {
        case 'fileSize':
          message = 'Warning ! \nThe uploaded file \"' + item.name + '\" is ' + this.formatBytes(item.size) + ', this exceeds the maximum allowed size of ' + this.formatBytes(this.maxFileSize);
          break;
        default:
          message = 'Error trying to upload file '+item.name;
          break;
      }
  
      alert(message);
    };

    /* this.uploader.onBeforeUploadItem = (item: any) => {
      item.url = 'http://localhost:3000/api/upload/' + this.player_id;
    }

    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
    };
    this.uploader.onCompleteItem = (item: any, status: any) => {
      if(JSON.parse(status).success == true) {
        console.log('Uploaded File Details:', item);
        //this.videoService.uploadVideoInfoToDatabase(this.player_id, item._file.name);
        let video_structure = {
          video_path  : URL_BASE + this.player_id + '/' + item._file.name,
          video_name  : item._file.name
        }
  
        this.videos.push(video_structure);
        //location.reload();
      }
    }; */

    /* this.uploader.onWhenAddingFileFailed = (item, filter) => {
      let message = '';
      switch (filter.name) {
        case 'fileSize':
          message = 'Warning ! \nThe uploaded file \"' + item.name + '\" is ' + this.formatBytes(item.size) + ', this exceeds the maximum allowed size of ' + this.formatBytes(this.maxFileSize);
          break;
        default:
          message = 'Error trying to upload file '+item.name;
          break;
      }
  
      alert(message);
    }; */
    /* this.uploader.onBeforeUploadItem = (item: any) => {
      item.url = 'http://localhost:3000/api/upload/' + this.player_id;
    } */

    this.getAllPlayerVideos(1);

  }

  getAllPlayerVideos(exercise_level : number) : any {
    this.exerciseService.getVideosOfExerciseLevel(exercise_level).subscribe(data=> {
    console.log(data); 
    this.videos = [];
    this.uploader.queue = [];

    for(let i=0; i < data.length; i++) {
      let exercise_level  = data[i].EXERCISE_LEVEL;
      let video_name      = data[i].VIDEO_NAME;
      let exercise_number = data[i].EXERCISE_NUMBER;
      console.log("XPTO: " + data[i]);

      let video_structure = {
        video_path      : URL_BASE + exercise_level + '/' + video_name,
        video_name      : video_name,
        exercise_level  : 1,
        exercise_number : exercise_number,
        file_loaded     : false
      }

      this.videos.push(video_structure);
    }

    });
  }

  
  formatBytes(bytes, decimals?) {
    if (bytes == 0) return '0 Bytes';
    const k = 1024,
      dm = decimals || 2,
      sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
      i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }
 
 
  uploadVideoOfExercise(video_index : number, exercise_level : number, exercise_id : number) {
    console.log(exercise_level);
    console.log(exercise_id);

    this.uploader.onBeforeUploadItem = (item: any) => {
      item.url = 'http://localhost:3000/api/upload/' + this.player_id;
    };

    /* 
    this.uploader.onCompleteItem = (item: any, status: any) => {
      if(JSON.parse(status).success == true) {
        console.log('Uploaded File Details:', item);
        //this.videoService.uploadVideoInfoToDatabase(this.player_id, item._file.name);
        let video_structure = {
          video_path  : URL_BASE + this.player_id + '/' + item._file.name,
          video_name  : item._file.name
        }
  
        this.videos.push(video_structure);
        //location.reload();
      }
    }; */

    this.uploader.uploadAll();

    this.videos[video_index].file_loaded = true;

  }

  selectedFileOnChanged(index : number) {
    this.videos[index].file_loaded = true;
  }

  goToExerciseDetail(exercise_level : number, exercise_number : number, video_path : string) {

    let detailData = {
      video_path      : video_path,
      exercise_level  : exercise_level,
      exercise_number : exercise_number
    }

    this.globalCommunictionService.changeDataExchange(detailData);
    this.router.navigate(['player', 'exercises_detail']);
    /* this.router.navigate(['./exercises_detail'], { relativeTo: this.activatedRoute, skipLocationChange: true }); */
  }

}
