import { Injectable, Inject } from '@angular/core';
import { Observable, Subject } from 'rxjs/Rx';
import { AngularFireDatabase, FirebaseRef } from 'angularfire2';

import { Lesson } from './lesson';

@Injectable()
export class LessonsService {
  sdkDb: any;

  constructor(private db: AngularFireDatabase, @Inject(FirebaseRef) fb) {
    this.sdkDb = fb.database().ref()
  }

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

  createNewLesson(courseId: string, lesson:any): Observable<any>{
    const lessonsToSave = Object.assign({}, lesson, {course: courseId});

    const newLessonKey = this.sdkDb.child('lessons').push().key;

    let dataToSave = {};

    dataToSave['lessons/' + newLessonKey] = lessonsToSave;
    dataToSave[`lessonsPerCourse/${courseId}/${newLessonKey}`] = true;

    return this.firebaseUpdate(dataToSave);
  }

  firebaseUpdate(dataToSave) {
    const subject = new Subject()
    this.sdkDb.update(dataToSave)
      .then(
        val => {
          subject.next(val);
          subject.complete();
        },
        err =>{
          subject.error(err);
          subject.complete();
        }
      )

    return subject.asObservable();
  }

}
