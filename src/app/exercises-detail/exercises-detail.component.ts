import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FileUploader } from 'ng2-file-upload';

import { User } from '@app/_models/user';
import { AuthenticationService } from './../_services/authentication.service';
import { ExerciseDetailService } from './exercises-detail.service';

import { AlertService } from '../_alert';
import { GlobalCommunicationService } from '../_helpers/globalcommunicationservice';
import { excerciseDetailData} from '../_models/exercise_detail';

const URL_BASE  = 'http://localhost:3000/video/';

@Component({
  selector: 'app-exercises-detail',
  templateUrl: './exercises-detail.component.html',
  styleUrls: ['./exercises-detail.component.scss'],
  providers: [ExerciseDetailService]
})
export class ExercisesDetailComponent implements OnInit {

  public video_path       : string;
  public excercise_level  : number;
  public excercise_number : number;
  public excercise_id     : number;
  private user            : User;
  private player_id       : number;
  public dataFromParent   : excerciseDetailData;

  public uploader: FileUploader = new FileUploader({
    itemAlias: 'image'
  });

  constructor(private route: ActivatedRoute, private authenticationService: AuthenticationService, private exerciseDetailService : ExerciseDetailService, 
              private globalCommunicationService: GlobalCommunicationService, protected alertService: AlertService) { 
    
    this.user       = authenticationService.currentUserValue;
    this.player_id  = authenticationService.currentUserValue.player_id;
    console.log("Video Component User: " + this.user.player_id);

    this.route.queryParams.subscribe(params => {
      // Defaults to 0 if no query param provided.
      console.log(params);
    });

  }

  ngOnInit() {

    //this.globalCommunictionService.currentData.subscribe(message => this.video_path = message)
    this.globalCommunicationService.currentData.subscribe(data => {
            this.video_path       = data.video_path;
            this.excercise_level  = data.exercise_level;
            this.excercise_number = data.exercise_number
            this.excercise_id =     data.exercise_id
    });
    console.log("this.video_path: " + this.video_path);
    console.log("this.excercise_level" + this.excercise_level);

    this.globalCommunicationService.changeData("Os meus Vídeos");

    this.uploader.onBeforeUploadItem = (item: any) => {
      item.url = 'http://localhost:3000/api/upload/' + this.player_id;
    }

    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
    };
    this.uploader.onCompleteItem = (item: any, status: any) => {
      if(JSON.parse(status).success == true) {
        console.log('Uploaded File Details:', item);
        this.exerciseDetailService.uploadVideoInfoToDatabase(this.player_id, item._file.name, this.excercise_level, this.excercise_number, this.excercise_id);
        this.alertService.success('O Ficheiro foi carregado com Sucesso!!'); //, { autoClose: true });
        let video_structure = {
          video_path  : URL_BASE + this.player_id + '/' + item._file.name,
          video_name  : item._file.name
        }
      }
    };
  }

}
