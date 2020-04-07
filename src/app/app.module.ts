import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS  } from '@angular/common/http'; 
import { FileUploadModule } from 'ng2-file-upload';

import { GlobalCommunicationService } from './_helpers/globalcommunicationservice';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PlayerComponent } from './player/player.component';
import { LoginComponent } from './login/login.component';


import { JwtInterceptor } from './_helpers/jwt.interceptor';
import { ErrorInterceptor } from './_helpers/error.interceptor';
import { FormsModule } from '@angular/forms';
import { VideosComponent } from './videos/videos.component';
import { AdminComponent } from './admin/admin.component';
import { ExercisesComponent } from './exercises/exercises.component';
import { ExercisesDetailComponent } from './exercises-detail/exercises-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    PlayerComponent,
    LoginComponent,
    VideosComponent,
    AdminComponent,
    ExercisesComponent,
    ExercisesDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    FileUploadModule

  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
        GlobalCommunicationService
        // provider used to create fake backend
        //fakeBackendProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
