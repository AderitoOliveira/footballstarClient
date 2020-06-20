import { Component, OnInit, HostListener, ViewChild, ElementRef, AfterViewInit, Renderer2, ViewChildren, QueryList, Directive, Input  } from '@angular/core';
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

/* @Directive({selector: 'start'})
export class Start {
  @Input() id: string;
} */

export class ExercisesComponent implements OnInit, AfterViewInit  {

  @ViewChild('Level2', {static: false}) level2_Element: ElementRef;
  @ViewChild('Level3', {static: false}) level3_Element: ElementRef;
  /* @ViewChild(Start,{static: false}) */
  @ViewChildren("Level") levels: QueryList<ElementRef>;

  all_videos                    : any = [];
  all_levels_position           : any = [];
  private player_id             : number;
  maxFileSize                   = 20 * 1024 * 1024; // modify this to your desired max file size
  private showLevel             : boolean;
  private level_id              : number = 2;
  public currentActive          = 1;
  public current_level_position = 0;
  public level2_Offset          : number = null;
  public level2_OffsetBottom    : number = null;
  public level3_Offset          : number = null;

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

    /* for(let i=1; i <= 3; i++) {
       this.getAllPlayerVideos(i);
       console.log("On Init: getAllPlayerVideos of level: " + i)
    } */

    this.getAllPlayerVideos(5);
    //this.getAllPlayerVideos(1);
    //this.getAllPlayerVideos(2);
  }

  ngAfterViewInit() {
    //this.level2_Offset        = this.level2_Element.nativeElement.offsetTop;
    //this.level3_Offset        = this.level3_Element.nativeElement.offsetTop;
    let current = 0;
    let previous =0;
    this.levels.changes.subscribe(() => {
      let images = this.levels.toArray().map((element, index) =>  {
      console.log("ZZZZZZZZZZZZZZZZZ: " + element.nativeElement.offsetTop);
      this.all_levels_position[index] = element.nativeElement.offsetTop;

      });
    });

  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(event) {
    // 200 is the height from bottom from where you want to trigger the infintie scroll, can we zero to detect bottom of window
    if ((document.body.clientHeight + window.scrollY + 0) >= document.body.scrollHeight) {
        console.log('tiggred');
        this.showLevel = true;
    } 

    if (window.pageYOffset >= (this.all_levels_position[this.current_level_position + 1]) -100) {
      this.current_level_position = this.current_level_position + 1;
      this.currentActive = this.currentActive + 1;
    }
    if (window.pageYOffset <= (this.all_levels_position[this.current_level_position - 1]) + 1000) {
      this.current_level_position = this.current_level_position - 1;
      this.currentActive = this.currentActive - 1;
    }

    
    console.log("this.current_level_position: " + this.current_level_position + "  --> this.currentActive: " + this.currentActive);
    console.log("window.pageYOffset: " + window.pageYOffset);
    console.log(" --> this.level0_start: " + this.all_levels_position[0]);
    console.log(" --> this.level1_start: " + this.all_levels_position[1]);
    console.log(" --> this.level2_start: " + this.all_levels_position[2]); 
  }


  getAllPlayerVideos(exercise_level : number) : any {
    this.exerciseService.getVideosOfExerciseLevel(exercise_level, this.player_id).subscribe(data=> {
    console.log(data); 
    this.all_videos = data;
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

  goToExerciseDetail(exercise_level : number, exercise_number : number, exercise_id : number, video_path : string) {

    let detailData = {
      video_path      : video_path,
      exercise_level  : exercise_level,
      exercise_number : exercise_number,
      exercise_id     : exercise_id
    }

    this.globalCommunictionService.changeDataExchange(detailData);
    this.router.navigate(['player', 'exercises_detail']);
    /* this.router.navigate(['./exercises_detail'], { relativeTo: this.activatedRoute, skipLocationChange: true }); */
  }

}
