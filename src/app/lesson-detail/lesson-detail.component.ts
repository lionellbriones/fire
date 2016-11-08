import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

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
    private route: ActivatedRoute,
    private lessonService: LessonsService
  ) { }

  ngOnInit() {
    const lessonUrl = this.route.snapshot.params['id'];

    const lesson$ = this.lessonService.findLessonByUrl(lessonUrl);

    lesson$.do(console.log).subscribe(lesson => this.lesson = lesson);
  }

}
