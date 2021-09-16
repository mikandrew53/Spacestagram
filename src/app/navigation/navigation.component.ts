import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  minDate: Date | undefined;
  maxDate: Date | undefined;
  constructor() { }

  ngOnInit(): void {
    const date = new Date();
    this.minDate = new Date(1995, 5, 16);
    this.maxDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  }

}
