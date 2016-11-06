import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { ActivatedRoute } from '@angular/router';

import { Lesson } from '../shared/model/lesson';
import { Course } from '../shared/model/course';
import { CoursesService } from '../shared/model/courses.service';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.css']
})
export class CourseDetailComponent implements OnInit {

  courseUrl: string;
  course$: Observable<Course>;
  lessons: Lesson[];

  constructor(
    private route: ActivatedRoute,
    private coursesService: CoursesService
  ) { }

  ngOnInit() {
    this.courseUrl = this.route.snapshot.params['id'];
    this.course$ = this.coursesService.findCourseByUrl(this.courseUrl);
    const lessons$ = this.coursesService.loadFirstLessonsPage(this.courseUrl, 3);

    lessons$.subscribe(lessons => this.lessons = lessons)
  }

  nextPage() {
    this.coursesService.loadNextPage(
      this.courseUrl,
      this.lessons[this.lessons.length - 1].$key,
      3
    ).subscribe(lessons => this.lessons = lessons);
  }

  previous() {

  }

}
