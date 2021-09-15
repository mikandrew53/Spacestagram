import { Component } from '@angular/core';
import {FormGroup, FormControl} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
// export class DateRangePickerFormsExample {
// }

export class AppComponent {
  items = [
    1, 1, 1
    // 1, 1, 1, 1, 1, 1,
    // 1, 1, 1, 1, 1, 1,
    // 1, 1, 1, 1, 1, 1,
  ]

  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });
}
