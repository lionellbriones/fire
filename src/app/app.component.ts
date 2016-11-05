import { Component } from '@angular/core';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title: string = 'Angular Fire 2';

  courses$: FirebaseListObservable<any>;
  lesson$: FirebaseObjectObservable<any>;

  lastCourse: any;

  constructor(af: AngularFire) {
    this.courses$ = af.database.list('courses');

    this.courses$.subscribe(
      courses => {
        console.log(courses);
        this.lastCourse = courses[courses.length-1]
      }
    )

    this.lesson$ = af.database.object('lessons/-KVLg-pSEo-rzpB-zbG1');

    this.lesson$.subscribe(console.log);
  }

  listPush() {
    this.courses$.push({description: 'TEST NEW COURSE'})
      .then(
        message => console.log('List Push Done', message),
        console.error
      );
  }

  listRemove() {
    this.courses$.remove(this.lastCourse);
  }

  listUpdate() {
    this.courses$.update(this.lastCourse, {
      description: 'Modified'
    })
  }
}
