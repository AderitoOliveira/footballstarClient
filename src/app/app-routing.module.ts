import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent} from './admin/admin.component';
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
  { path: 'admin',   canActivate: [AuthGuard], component: AdminComponent, pathMatch: 'full',  data: {roles: [Role.Admin] } },
  { path: '',   component: LoginComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: true } )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
