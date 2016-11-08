import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { AngularFireDatabase } from 'angularfire2';

import { Lesson } from './lesson';

@Injectable()
export class LessonsService {

  constructor(private db: AngularFireDatabase) { }

  findAllLessons(): Observable<Lesson[]> {
    return this.db.list('lessons')
      .map(Lesson.fromJsonList);
  }

  findLessonByUrl(lessonUrl: string): Observable<Lesson>{
    return this.db.list('lessons', {
      query: {
        orderByChild: 'url',
        equalTo: lessonUrl
      }
    }).map(results => Lesson.fromJson(results[0]));
  }

  loadNextLesson(courseId: string, key: string): Observable<Lesson>{
     return this.db.list(`lessonsPerCourse/${courseId}`, {
      query: {
        orderByKey: true,
        startAt: key,
        limitToFirst: 2
      }
    })
    .map(results => results[1].$key)
    .switchMap(lessonId => this.db.object(`lessons/${lessonId}`))
    .map(Lesson.fromJson);
  }

  loadPreviousLesson(courseId: string, key: string): Observable<Lesson>{
     return this.db.list(`lessonsPerCourse/${courseId}`, {
      query: {
        orderByKey: true,
        endAt: key,
        limitToFirst: 2
      }
    })
    .map(results => results[0].$key)
    .switchMap(lessonId => this.db.object(`lessons/${lessonId}`))
    .map(Lesson.fromJson);
  }

}
