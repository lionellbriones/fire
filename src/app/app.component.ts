import { Component } from '@angular/core';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  courses: FirebaseListObservable<any>;
  title: string = 'Angular Fire 2';

  constructor(af: AngularFire) {
    this.courses = af.database.list('courses');

    this.courses.subscribe(console.log);
  }
}
