import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { firebaseConfig } from '../environments/firebase.config';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

import { LessonsService } from './shared/model/lessons.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  providers: [LessonsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
