import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent} from './admin/admin.component';
import { ValidateexerciseComponent } from './admin/validateexercise/validateexercise.component';
import { ValidateexercisedetailComponent } from './admin/validateexercisedetail/validateexercisedetail.component';
import { PlayerComponent} from './player/player.component';
import { LoginComponent} from './login/login.component';
import { VideosComponent} from './videos/videos.component';
import { ExercisesComponent } from './exercises/exercises.component';
import { ExercisesDetailComponent } from './exercises-detail/exercises-detail.component';
import { AuthGuard } from './_helpers/auth.guard';
import { Role } from './_models/role';

const routes: Routes = [
  
  { path: 'player',  component: PlayerComponent, canActivate: [AuthGuard], pathMatch : 'prefix',
     children: [
      { path: 'videos', component: VideosComponent, canActivate: [AuthGuard], pathMatch: 'full'},
      { path: 'exercices',   canActivate: [AuthGuard], component: ExercisesComponent, pathMatch: 'full'} ,
      { path: 'exercises_detail',   canActivate: [AuthGuard], component: ExercisesDetailComponent, pathMatch: 'full'}
      /* { path: 'exercices',   canActivate: [AuthGuard], component: ExercisesComponent, pathMatch: 'full'} ,
      { path: 'exercises_detail',   canActivate: [AuthGuard], component: ExercisesDetailComponent, pathMatch: 'full' } */
    ]
  },
  { path: 'admin',   canActivate: [AuthGuard], component: AdminComponent, pathMatch: 'prefix',  data: {roles: [Role.Admin] }, 
    children: [
      { path: 'validate_exercise', component: ValidateexerciseComponent, canActivate: [AuthGuard], pathMatch: 'full'},
      { path: 'validate_exercise_detail',   canActivate: [AuthGuard], component: ValidateexercisedetailComponent, pathMatch: 'full'} 
    ]
  },
  { path: '',   component: LoginComponent, pathMatch: 'full' }
];

@NgModule({
  //imports: [RouterModule.forRoot(routes, { enableTracing: true } )],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
