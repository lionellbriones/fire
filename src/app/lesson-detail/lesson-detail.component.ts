import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import * as _ from 'lodash';

import { Lesson } from '../shared/model/lesson';
import { LessonsService } from '../shared/model/lessons.service';

@Component({
  selector: 'app-lesson-detail',
  templateUrl: './lesson-detail.component.html',
  styleUrls: ['./lesson-detail.component.css']
})
export class LessonDetailComponent implements OnInit {
  lesson: Lesson;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private lessonService: LessonsService
  ) { }

  ngOnInit() {
    this.route.params.switchMap(params => {
      const lessonUrl = params['id'];

      return this.lessonService.findLessonByUrl(lessonUrl);
    }).subscribe(lesson => this.lesson = lesson);
  }

  next() {
    this.lessonService.loadNextLesson(this.lesson.courseId, this.lesson.$key)
      .subscribe(this.navigateToLesson.bind(this));
  }

  previous() {
    this.lessonService.loadPreviousLesson(this.lesson.courseId, this.lesson.$key)
      .subscribe(this.navigateToLesson.bind(this));
  }

  navigateToLesson(lesson: Lesson){
    this.router.navigate(['lessons', lesson.url]);
  }

}
