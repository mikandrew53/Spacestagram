import { Component, OnInit } from '@angular/core';
import { Card } from '../cards/CardModle';



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

  dateRangeChange(dateRangeStart: any, dateRangeEnd: any){
    if (dateRangeEnd === ''){
      console.log('');
    }
    dateRangeStart = this.parseDate(dateRangeStart)
    dateRangeEnd = this.parseDate(dateRangeEnd)
  }

  parseDate(date: string){
    let string = []
    for ( let char of date){
        if (char == '/')
          string.push('-')  
        else
          string.push(char)
    }
    return string.join('');

  }

  

}
