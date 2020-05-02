import { Component, OnInit, HostListener, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
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

export class ExercisesComponent implements OnInit, AfterViewInit  {

  @ViewChild('Level2', {static: false}) level2_Element: ElementRef;
  @ViewChild('Level3', {static: false}) level3_Element: ElementRef;

  all_videos     : any = [];
  videos_level_1 : any = [];
  videos_level_2 : any = [];
  private player_id         : number;
  maxFileSize = 20 * 1024 * 1024; // modify this to your desired max file size
  private showLevel         : boolean;
  private level_id          : number = 2;
  public currentActive      = 1;
  public level2_Offset      : number = null;
  public level2_OffsetBottom      : number = null;
  public level3_Offset      : number = null;

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

    /* for(let i=1; i < 3; i++) {
      let var_name = 'this.videos_level_' + i;
      this.getAllPlayerVideos(i, var_name);
    } */

    this.getAllPlayerVideos(1);
    this.getAllPlayerVideos(2);
  }

  ngAfterViewInit() {
    this.level2_Offset        = this.level2_Element.nativeElement.offsetTop;
    this.level3_Offset        = this.level3_Element.nativeElement.offsetTop;
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(event) {
    // 200 is the height from bottom from where you want to trigger the infintie scroll, can we zero to detect bottom of window
    if ((document.body.clientHeight + window.scrollY + 0) >= document.body.scrollHeight) {
        console.log('tiggred');
        this.showLevel = true;
    } 
    if (window.pageYOffset <= (this.level2_Offset + 2000)) {
      this.currentActive = 1;
    }
    if (window.pageYOffset >= (this.level2_Offset + 2700)) {
      this.currentActive = 2;
    }
    if (window.pageYOffset >= (this.level3_Offset + 5450) && window.pageYOffset < document.body.scrollHeight) {
      this.currentActive = 3;
    }
    console.log("window.pageYOffset: " + window.pageYOffset + " --> this.level2_Offset: " + this.level2_Offset + " --> this.level3_Offset: " + this.level3_Offset); 
  }

  getAllPlayerVideos(exercise_level : number) : any {
    this.exerciseService.getVideosOfExerciseLevel(exercise_level, this.player_id).subscribe(data=> {
    console.log(data); 
    let videos_level = [];

    for(let i=0; i < data.length; i++) {
      let exercise_level  = data[i].EXERCISE_LEVEL;
      let video_name      = data[i].VIDEO_NAME;
      let exercise_number = data[i].EXERCISE_NUMBER;
      let video_uploaded  = data[i].VIDEO_UPLOADED;
      let video_reviewed  = data[i].VIDEO_REVIEWED;
      console.log("XPTO: " + data[i]);

      let video_structure = {
        video_path      : URL_BASE + exercise_level + '/' + video_name,
        video_name      : video_name,
        exercise_level  : 1,
        exercise_number : exercise_number,
        file_loaded     : false,
        video_uploaded  : video_uploaded,
        video_reviewed  : video_reviewed
      }

      videos_level.push(video_structure);
    }

    this.all_videos.push(videos_level);
    
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
 
 
  /* uploadVideoOfExercise(video_index : number, exercise_level : number, exercise_id : number) {
    console.log(exercise_level);
    console.log(exercise_id);

    this.uploader.onBeforeUploadItem = (item: any) => {
      item.url = 'http://localhost:3000/api/upload/' + this.player_id;
    };

    this.uploader.uploadAll();

    this.videos[video_index].file_loaded = true;

  } */

  /* selectedFileOnChanged(index : number) {
    this.videos[index].file_loaded = true;
  } */

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
