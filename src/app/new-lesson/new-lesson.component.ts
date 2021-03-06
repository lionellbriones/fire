import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { LessonsService } from '../shared/model/lessons.service';

@Component({
  selector: 'app-new-lesson',
  templateUrl: './new-lesson.component.html',
  styleUrls: ['./new-lesson.component.css']
})
export class NewLessonComponent implements OnInit {

  courseId: string;

  constructor(private route: ActivatedRoute, private lessonService: LessonsService) { }

  ngOnInit() {
    this.courseId = this.route.snapshot.queryParams['courseId'];
    console.log(this.courseId);
  }

  save(form) {

    this.lessonService.createNewLesson(this.courseId, form.value)
      .subscribe(
        () => {
          alert("Lesson created successfully. Create another lesson?");
          form.reset();
        },
        err => alert(`Error creating lesson ${err}`)
      );
  }

}
