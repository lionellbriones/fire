import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { firebaseConfig } from '../environments/firebase.config';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

import { routerConfig } from './router.config';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

import { LessonsService } from './shared/model/lessons.service';
import { CoursesService } from './shared/model/courses.service';
import { LessonResolver } from './shared/model/lesson.resolver';

import { LessonsListComponent } from './lessons-list/lessons-list.component';
import { TopMenuComponent } from './top-menu/top-menu.component';
import { CoursesComponent } from './courses/courses.component';
import { CourseDetailComponent } from './course-detail/course-detail.component';
import { LessonDetailComponent } from './lesson-detail/lesson-detail.component';
import { SafeUrlPipe } from './shared/security/safe-url.pipe';
import { NewLessonComponent } from './new-lesson/new-lesson.component';
import { LessonFormComponent } from './lesson-form/lesson-form.component';
import { EditLessonComponent } from './edit-lesson/edit-lesson.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LessonsListComponent,
    TopMenuComponent,
    CoursesComponent,
    CourseDetailComponent,
    LessonDetailComponent,
    SafeUrlPipe,
    NewLessonComponent,
    LessonFormComponent,
    EditLessonComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routerConfig),
    AngularFireModule.initializeApp(firebaseConfig),
    ReactiveFormsModule
  ],
  providers: [LessonsService, CoursesService, LessonResolver],
  bootstrap: [AppComponent]
})
export class AppModule { }
