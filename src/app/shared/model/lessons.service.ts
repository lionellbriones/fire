import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { AngularFire } from 'angularfire2';

import { Lesson } from './lesson';

@Injectable()
export class LessonsService {

  constructor(private af: AngularFire) { }

  findAllLessons(): Observable<Lesson[]> {
    return this.af.database.list('lessons')
      .map(Lesson.fromJsonList);
  }

  findLessonByUrl(lessonUrl: string): Observable<Lesson>{
    console.log(lessonUrl);
    return this.af.database.list('lessons', {
      query: {
        orderByChild: 'url',
        equalTo: lessonUrl
      }
    }).map(results => Lesson.fromJson(results[0]));
  }

}
