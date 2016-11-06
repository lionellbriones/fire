import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { firebaseConfig } from '../environments/firebase.config';
import { RouterModule } from '@angular/router';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

import { routerConfig } from './router.config';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

import { LessonsService } from './shared/model/lessons.service';
import { LessonsListComponent } from './lessons-list/lessons-list.component';
import { TopMenuComponent } from './top-menu/top-menu.component';
import { CoursesComponent } from './courses/courses.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LessonsListComponent,
    TopMenuComponent,
    CoursesComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routerConfig),
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  providers: [LessonsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
